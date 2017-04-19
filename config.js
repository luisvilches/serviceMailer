module.exports = {
    port: process.env.PORT || 3000,
    db: {
        connection: "mongodb://localhost/database"
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET || "tokensupersecret421578963"
}