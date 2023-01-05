import { QuestionOptions } from './QuestionOptions';

export const Question = ({
    msg,
    options,
    parentKey,
    onAnswerClick,
    answer
}: any) => {
    return (
        <>
            <div className="d-flex flex-row justify-content-start mb-4">
                {/* <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{
                        width: '45px',
                        height: '100%'
                    }}
                /> */}
                <div
                    className="p-3"
                    style={{
                        borderRadius: '15px',
                        backgroundColor: 'rgb(104,134,255,.2)',
                        borderBottomLeftRadius: 0
                    }}
                >
                    <p className="small mb-0">{msg}</p>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-start mb-4">
                <QuestionOptions
                    options={options}
                    parentKey={parentKey}
                    onAnswerClick={onAnswerClick}
                    answer={answer}
                />
            </div>
        </>
    );
};
