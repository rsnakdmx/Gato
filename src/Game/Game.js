import React, { Component } from 'react';
import './Game.css';
import Modal from './../Modal/Modal';
import Board from './../Board/Board';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function calculateWinner(squares)
{
    const lines = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++)
    {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }

    return null;
}

class Game extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            history: [{ squares: Array(9).fill(null) }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i])
            return;

        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState(
        { 
            history: history.concat(
            [
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step)
    {
        this.setState(
        {
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render()
    {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const appStatus = (winner) ? "El ganador es: " + winner : "Turno actual: " + (this.state.xIsNext ? "X" : "O");

        const moves = history.map((step, move) => 
        {
            const desc = move ? "Movimiento " + move : "Inicio del juego";
            const setBtn = <li key={ move }>
                               <Button variant="outline-dark" onClick={ () => this.jumpTo(move) }>
                                   { desc }
                               </Button>
                           </li>;
            const win = <Modal msg={ appStatus }/>;
            const noWin = <Modal msg={ "Ya no quedan movimientos posibles." }/>;
            
            if (winner && move === this.state.stepNumber)
                return ([setBtn, win]);

            else if (move === 9)
                return ([setBtn, noWin]);

            else
                return (setBtn);
        });

        return (
            <Container>
                <Row>
                    <Col md={ 6 }>
                        <Container>
                            <Row>
                                <Col>
                                    <Board squares={ current.squares } onClick={ (i) => this.handleClick(i) }/>
                                    { appStatus }
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={ 6 }>
                        <Container>
                            <Row>
                                <Col md={{ offset: 2 }}>
                                    { moves }
                                </Col>
                                <Col md={ 2 }></Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Game;
