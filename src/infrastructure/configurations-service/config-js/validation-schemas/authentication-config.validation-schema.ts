import * as Joi from 'joi';

const AuthenticationConfigValidationSchema = Joi.object({
    JWT_ACCESS_TOKEN_EXPIRES_IN_MS: Joi.number().integer(),
    JWT_REFRESH_TOKEN_EXPIRES_IN_MS: Joi.number().integer(),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required().not().empty(),
    JWT_REFRESH_ACCESS_TOKEN_SECRET: Joi.string().required().not().empty(),
});

export default AuthenticationConfigValidationSchema;
