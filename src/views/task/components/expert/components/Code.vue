<template>
    <div class="code-box">
        <div class="code-variable-box py-20px">
            <el-space class="mb-10px px-20px" v-for="item in variableList" :key="item.id">
                <p class="w-100px">{{ item.key }}</p>
                <el-input class="round-input" v-model="item.value" />
            </el-space>
        </div>
        <div class="w-full bg-primary m-20px code-context-box">
            <div v-html="code"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
const code = ref("# coding:utf-8\n\nimport sys\nsys.path.append(\"..\")\nimport os\nimport math\nimport json\nimport time\nimport logging\nimport shutil\nimport numpy as np\nimport pandas as pd\nimport tensorflow as tf\nimport latticex.rosetta as rtt\nimport channel_sdk\n\n\nnp.set_printoptions(suppress=True)\ntf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)\nos.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'\nrtt.set_backend_loglevel(5)  # All(0), Trace(1), Debug(2), Info(3), Warn(4), Error(5), Fatal(6)\nlog = logging.getLogger(__name__)\n\nclass PrivacyLRTrain(object):\n    '''\n    Privacy logistic regression train base on rosetta.\n    '''\n\n    def __init__(self,\n                 channel_config: str,\n                 cfg_dict: dict,\n                 data_party: list,\n                 result_party: list,\n                 results_dir: str):\n        log.info(f\"channel_config:{channel_config}\")\n        log.info(f\"cfg_dict:{cfg_dict}\")\n        log.info(f\"data_party:{data_party}, result_party:{result_party}, results_dir:{results_dir}\")\n        assert isinstance(channel_config, str), \"type of channel_config must be str\"\n        assert isinstance(cfg_dict, dict), \"type of cfg_dict must be dict\"\n        assert isinstance(data_party, (list, tuple)), \"type of data_party must be list or tuple\"\n        assert isinstance(result_party, (list, tuple)), \"type of result_party must be list or tuple\"\n        assert isinstance(results_dir, str), \"type of results_dir must be str\"\n        \n        self.channel_config = channel_config\n        self.data_party = list(data_party)\n        self.result_party = list(result_party)\n        self.party_id = cfg_dict[\"party_id\"]\n        self.input_file = cfg_dict[\"data_party\"].get(\"input_file\")\n        self.key_column = cfg_dict[\"data_party\"].get(\"key_column\")\n        self.selected_columns = cfg_dict[\"data_party\"].get(\"selected_columns\")\n\n        dynamic_parameter = cfg_dict[\"dynamic_parameter\"]\n        self.label_owner = dynamic_parameter.get(\"label_owner\")\n        if self.party_id == self.label_owner:\n            self.label_column = dynamic_parameter.get(\"label_column\")\n            self.data_with_label = True\n        else:\n            self.label_column = \"\"\n            self.data_with_label = False\n                        \n        algorithm_parameter = dynamic_parameter[\"algorithm_parameter\"]\n        self.epochs = algorithm_parameter.get(\"epochs\", 10)\n        self.batch_size = algorithm_parameter.get(\"batch_size\", 256)\n        self.learning_rate = algorithm_parameter.get(\"learning_rate\", 0.001)\n        self.use_validation_set = algorithm_parameter.get(\"use_validation_set\", True)\n        self.validation_set_rate = algorithm_parameter.get(\"validation_set_rate\", 0.2)\n        self.predict_threshold = algorithm_parameter.get(\"predict_threshold\", 0.5)\n\n        self.output_file = os.path.join(results_dir, \"model\")\n        \n        self.check_parameters()\n\n    def check_parameters(self):\n        log.info(f\"check parameter start.\")        \n        assert self.epochs > 0, \"epochs must be greater 0\"\n        assert self.batch_size > 0, \"batch size must be greater 0\"\n        assert self.learning_rate > 0, \"learning rate must be greater 0\"\n        assert 0 < self.validation_set_rate < 1, \"validattion set rate must be between (0,1)\"\n        assert 0 <= self.predict_threshold <= 1, \"predict threshold must be between [0,1]\"\n        \n        if self.input_file:\n            self.input_file = self.input_file.strip()\n        if self.party_id in self.data_party:\n            if os.path.exists(self.input_file):\n                input_columns = pd.read_csv(self.input_file, nrows=0)\n                input_columns = list(input_columns.columns)\n                if self.key_column:\n                    assert self.key_column in input_columns, f\"key_column:{self.key_column} not in input_file\"\n                if self.selected_columns:\n                    error_col = []\n                    for col in self.selected_columns:\n                        if col not in input_columns:\n                            error_col.append(col)   \n                    assert not error_col, f\"selected_columns:{error_col} not in input_file\"\n                if self.label_column:\n                    assert self.label_column in input_columns, f\"label_column:{self.label_column} not in input_file\"\n            else:\n                raise Exception(f\"input_file is not exist. input_file={self.input_file}\")\n        log.info(f\"check parameter finish.\")\n                        \n        \n    def train(self):\n        '''\n        Logistic regression training algorithm implementation function\n        '''\n\n        log.info(\"extract feature or label.\")\n        train_x, train_y, val_x, val_y = self.extract_feature_or_label(with_label=self.data_with_label)\n        \n        log.info(\"start create and set channel.\")\n        self.create_set_channel()\n        log.info(\"waiting other party connect...\")\n        rtt.activate(\"SecureNN\")\n        log.info(\"protocol has been activated.\")\n        \n        log.info(f\"start set save model. save to party: {self.result_party}\")\n        rtt.set_saver_model(False, plain_model=self.result_party)\n        # sharing data\n        log.info(f\"start sharing train data. data_owner={self.data_party}, label_owner={self.label_owner}\")\n        shard_x, shard_y = rtt.PrivateDataset(data_owner=self.data_party, label_owner=self.label_owner).load_data(train_x, train_y, header=0)\n        log.info(\"finish sharing train data.\")\n        column_total_num = shard_x.shape[1]\n        log.info(f\"column_total_num = {column_total_num}.\")\n        \n        if self.use_validation_set:\n            log.info(\"start sharing validation data.\")\n            shard_x_val, shard_y_val = rtt.PrivateDataset(data_owner=self.data_party, label_owner=self.label_owner).load_data(val_x, val_y, header=0)\n            log.info(\"finish sharing validation data.\")\n\n        if self.party_id not in self.data_party:  \n            # mean the compute party and result party\n            log.info(\"compute start.\")\n            X = tf.placeholder(tf.float64, [None, column_total_num])\n            Y = tf.placeholder(tf.float64, [None, 1])\n            W = tf.Variable(tf.zeros([column_total_num, 1], dtype=tf.float64))\n            b = tf.Variable(tf.zeros([1], dtype=tf.float64))\n            logits = tf.matmul(X, W) + b\n            loss = tf.nn.sigmoid_cross_entropy_with_logits(labels=Y, logits=logits)\n            loss = tf.reduce_mean(loss)\n            # optimizer\n            optimizer = tf.train.GradientDescentOptimizer(self.learning_rate).minimize(loss)\n            init = tf.global_variables_initializer()\n            saver = tf.train.Saver(var_list=None, max_to_keep=5, name='v2')\n            \n            pred_Y = tf.sigmoid(tf.matmul(X, W) + b)\n            reveal_Y = rtt.SecureReveal(pred_Y)\n            actual_Y = tf.placeholder(tf.float64, [None, 1])\n            reveal_Y_actual = rtt.SecureReveal(actual_Y)\n\n            with tf.Session() as sess:\n                log.info(\"session init.\")\n                sess.run(init)\n                # train\n                log.info(\"train start.\")\n                train_start_time = time.time()\n                batch_num = math.ceil(len(shard_x) / self.batch_size)\n                for e in range(self.epochs):\n                    for i in range(batch_num):\n                        bX = shard_x[(i * self.batch_size): (i + 1) * self.batch_size]\n                        bY = shard_y[(i * self.batch_size): (i + 1) * self.batch_size]\n                        sess.run(optimizer, feed_dict={X: bX, Y: bY})\n                        if (i % 50 == 0) or (i == batch_num - 1):\n                            log.info(f\"epoch:{e + 1}/{self.epochs}, batch:{i + 1}/{batch_num}\")\n                log.info(f\"model save to: {self.output_file}\")\n                saver.save(sess, self.output_file)\n                train_use_time = round(time.time()-train_start_time, 3)\n                log.info(f\"save model success. train_use_time={train_use_time}s\")\n                \n                if self.use_validation_set:\n                    Y_pred = sess.run(reveal_Y, feed_dict={X: shard_x_val})\n                    log.info(f\"Y_pred:\\n {Y_pred[:10]}\")\n                    Y_actual = sess.run(reveal_Y_actual, feed_dict={actual_Y: shard_y_val})\n                    log.info(f\"Y_actual:\\n {Y_actual[:10]}\")\n        \n            running_stats = str(rtt.get_perf_stats(True)).replace('\\n', '').replace(' ', '')\n            log.info(f\"running stats: {running_stats}\")\n        else:\n            log.info(\"computing, please waiting for compute finish...\")\n        rtt.deactivate()\n     \n        log.info(\"remove temp dir.\")\n        if self.party_id in (self.data_party + self.result_party):\n            # self.remove_temp_dir()\n            pass\n        else:\n            # delete the model in the compute party.\n            self.remove_output_dir()\n        \n        if (self.party_id in self.result_party) and self.use_validation_set:\n            log.info(\"result_party evaluate model.\")\n            from sklearn.metrics import roc_auc_score, roc_curve, f1_score, precision_score, recall_score, accuracy_score\n            Y_pred_prob = Y_pred.astype(\"float\").reshape([-1, ])\n            Y_true = Y_actual.astype(\"float\").reshape([-1, ])\n            auc_score = roc_auc_score(Y_true, Y_pred_prob)\n            log.info(f\"AUC: {round(auc_score, 6)}\")\n            Y_pred_class = (Y_pred_prob > self.predict_threshold).astype('int64')  # default threshold=0.5\n ")
const variableList = reactive([
    {
        id: 1,
        key: '1111111111',
        value: '11111111'
    },
    {
        id: 2,
        key: '22222222222',
        value: '2222222222'
    },
    {
        id: 3,
        key: '33333333333',
        value: '33333333'
    }
]);
</script>

<style scoped lang='scss'>
.code-box {
    height: 100%;
    .code-variable-box {
        border-bottom: 1px solid #eeeeee;
    }
    :deep(.el-input__inner) {
        height: 40px;
        border-radius: 20px;
        background-color: #eeeeee;
    }
    .code-context-box {
        background-color: #f5f8fa;
        white-space: pre-line;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        overflow-y: scroll;
        height: calc(100% - 231px);
    }
}
</style>