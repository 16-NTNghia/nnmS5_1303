module.exports = {
    CreateErrorResponse: (res, message, status) => {
        return res.status(status).send({
            success: false,
            message: message,
        })
    },

    CreateSuccessResponse: (res, data, status) => {
        return res.status(status).send({
            success: true,
            data: data,
        })
    },
}