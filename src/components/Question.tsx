import { ReactNode } from 'react';
import cn from 'classnames';

import '../styles/question.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?:boolean
    isHighlighted?: boolean
}

export function Question({
    author,
    content,
    children,
    isAnswered = false,
    isHighlighted = false
}: QuestionProps) {
    return (
        //TRANSFORMANDO A CLASSE EM CLASSE DINÂMICA COM IF TERNÁRIO - ROW (24 )
        // <div className={`question-list ${isAnswered ? ' answered' : ''} ${isHighlighted ? ' highlighted' : ''}` } >

        //CRIANDO E UTILIZANDO A MESMA CLASSE ACIMA COM O PACOTE CLASSNAMES 
            <div 
                className={cn(
                    'question',
                    { answered: isAnswered },//isAnswered é a propriedade passada acima no type e a classe answered so é aplicada caso isAnswered seja true
                    { highlighted: isHighlighted && !isAnswered},//isHighlighted é a propriedade passada acima no type e a classe highlighted so é aplicada caso isHighlighted seja true
                )}
            >
                <p>{content}</p>
                <footer>
                    <div className="user-info">
                        <img src={author.avatar} alt={author.name} />
                            <span>{author.name}</span>
                    </div>
                    <div>{children}</div>
                </footer>
            </div>
    );
}