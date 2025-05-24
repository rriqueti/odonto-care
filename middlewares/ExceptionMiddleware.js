export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err); // Se headers já foram enviados, delega o erro adiante
    }

    const status = err.status || 500;
    const msg = "Erro interno no servidor";
    const detalhes = err.message;

    res.status(status).json({
        status: status,
        msg: msg,
        detalhes: detalhes
    });
};

export const catchError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}