const Joi = require('joi');

const baseTestConfigItems = {
    repetitions: Joi.number().min(1),
    timeout: Joi.number().min(1),
    getRequestStatsFor: Joi.string(),
    viewPort: Joi.object().keys({
        width: Joi.number().required().min(1),
        height: Joi.number().required().min(1),
    }),
    pageWaitOnLoad: Joi.number().min(1),
    headless: Joi.boolean(),
    showDevTools: Joi.boolean(),
    cookie: Joi.object().keys({
        name: Joi.string().required(),
        value: Joi.string().required(),
        url: Joi.string(),
        domain: Joi.string(),
        path: Joi.string(),
        expires: Joi.number(),
        httpOnly: Joi.boolean(),
        secure: Joi.boolean(),
        sameSite: Joi.string().valid(['Strict', 'Lax']),
    }).or('url', 'domain'),
};

const baseTestConfig = Joi.object().keys({
    ...baseTestConfigItems,
    lighthouse: Joi.array(),
    ppc: Joi.array(),
});
const pageTestConfig = Joi.object().keys({
    ...baseTestConfigItems,
    url: Joi.string().required(),
});

const configSchema = Joi.object().keys({
    defaults: baseTestConfig,
    pages: Joi.array().items(pageTestConfig).required(),
});

module.exports = config => Joi.validate(config, configSchema);
