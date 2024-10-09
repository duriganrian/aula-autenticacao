import Navegacao from '../../components/Navegacao/Navegacao';
import { useState, useEffect } from 'react';
import PessoaRequests from '../../fetch/PessoaRequests';
import CardPessoa from '../../components/CardPessoa/CardPessoa';
import Button from 'react-bootstrap/Button';
import styles from './Pessoa.module.css';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

function Pessoa() {
    const [pessoas, setPessoas] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4;

    useEffect(() => {
        const fetchPessoas = async () => {
            try {
                const listaPessoas = await PessoaRequests.listarPessoas();
                if (listaPessoas) {
                    setPessoas(listaPessoas);
                }
            } catch (error) {
                console.error("Erro ao buscar pessoas:", error);
            }
        };

        fetchPessoas();
    }, []);

    // Verificar se o array 'pessoas' está disponível e se é um array válido
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const pessoasExibidas = Array.isArray(pessoas) ? pessoas.slice(indiceInicial, indiceFinal) : [];
    const totalPaginas = Math.ceil(pessoas.length / itensPorPagina);

    const proximaPagina = () => {
        if (indiceFinal < pessoas.length) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    return (
        <>
            <Navegacao />
            <div className={styles.cardsContainer}>
                {pessoasExibidas.length > 0 ? (
                    pessoasExibidas.map(pessoa => (
                        <CardPessoa key={pessoa.id} pessoa={pessoa} className={styles.cards} />
                    ))
                ) : (
                    <p>Nenhuma pessoa encontrada.</p>
                )}
            </div>
            <div className={styles.paginacao}>
                <Button onClick={paginaAnterior} disabled={paginaAtual === 1} className={styles.botao}>
                    <GrFormPrevious className={styles.iconBotao} />
                </Button>
                <Button onClick={proximaPagina} disabled={indiceFinal >= pessoas.length} className={styles.botao}>
                    <GrFormNext className={styles.iconBotao} />
                </Button>
            </div>
            <p style={{ textAlign: 'center' }}>Página {paginaAtual} de {totalPaginas}</p>
        </>
    );
}

export default Pessoa;
