const simpleKoa = require('./application');
const app = new simpleKoa();

// 错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        // 在这里进行定制化的错误处理
    }
});

app.use(async ctx => {
    throw new Error('ooops');
});

app.on('error', (err) => {
    console.log(err.stack);
});

app.listen(3000, () => {
    console.log('listening on 3000');
});