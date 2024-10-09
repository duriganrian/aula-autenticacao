import express, { Request, Response } from 'express';
import { Auth } from './util/Auth';
import { Consultas } from './Consultas';

const router = express.Router();
router.post('/login', Auth.validacaoUsuario);

router.get('/', (req: Request, res: Response) => { res.send('Hello World!') });

router.post('/login', Auth.validacaoUsuario);

router.get('/rota-protegida', Auth.verifyToken, (req: Request, res: Response) => { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') });

router.get('/pessoas', Consultas.todos);

export { router }