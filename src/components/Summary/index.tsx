import React, {useContext} from "react";
import { Container } from "./styles";

import incomeImg from '../../assets/income.svg';
import outComeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { TransactionsContext } from "../../TransactionsContext";

export function Summary(){
    const {transactions} = useContext(TransactionsContext);
    const summary = transactions.reduce((acc, transaction) =>{
        if(transaction.type === 'deposit'){
                acc.deposits+= transaction.amount;
                acc.totalSummary += transaction.amount;
        }else{
            acc.withdraw += transaction.amount;
            acc.totalSummary -= transaction.amount;
        }
        return acc;
    },{deposits:0,
        withdraw:0,
        totalSummary:0 });

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR',{
                                        style:'currency', 
                                        currency: 'BRL'    
                                    }).format(summary.deposits)}
                </strong>
            </div> 
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outComeImg} alt="Saídas" />
                </header>
                <strong>
                    - {new Intl.NumberFormat('pt-BR',{
                                        style:'currency', 
                                        currency: 'BRL'    
                                    }).format(summary.withdraw)}
                </strong>
            </div> 
            <div className="highlight-background"> 
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR',{
                                        style:'currency', 
                                        currency: 'BRL'    
                                    }).format(summary.totalSummary)}
                </strong>
            </div> 
        
        </Container>
    );
}