
import {ChatCompletion, setEnvVariable} from "@baiducloud/qianfan";

// 使用安全认证AK/SK鉴权，通过环境变量初始化；替换下列示例中参数，安全认证Access Key替换your_iam_ak，Secret Key替换your_iam_sk
setEnvVariable('QIANFAN_ACCESS_KEY','your_iam_ak');
setEnvVariable('QIANFAN_SECRET_KEY','your_iam_sk');

const client = new  ChatCompletion();
async function main() {
    const stream = await client.chat({
        messages: [
            {
                role: 'user',
                content: '你好！',
            },
        ],
        stream: true,   //启用流式返回
    });
      for await (const chunk of stream as AsyncIterableIterator<any>) {
        console.log(chunk);
    }
}

main();
