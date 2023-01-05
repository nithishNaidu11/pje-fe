import { MDBBtn } from 'mdb-react-ui-kit';

export const QuestionOption = ({
    label,
    parentKey,
    value,
    onOptionClick,
    isAnswer = false
}: any) => {
    return (
        <MDBBtn
            size="lg"
            outline
            className="me-1"
            style={{
                borderRadius: '5px',
                borderColor: '#3445a2',
                border: isAnswer ? 'inherit' : 'solid 1px',
                color: isAnswer ? 'white' : '#3445a2',
                backgroundColor: isAnswer ? '#3445a2' : 'inherit',
                textTransform: 'none'
            }}
            onClick={() => {
                onOptionClick(parentKey, value);
            }}
        >
            {label}
        </MDBBtn>
    );
};
