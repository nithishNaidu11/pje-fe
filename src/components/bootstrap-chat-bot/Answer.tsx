export const Answer = ({ answer }: any) => {
    return (
        <div className="d-flex flex-row justify-content-end mb-4">
            <div
                className="p-3 border"
                style={{
                    borderRadius: '15px',
                    backgroundColor: '#fbfbfb',
                    borderBottomRightRadius: 0
                }}
            >
                <p className="small mb-0">{answer.label}</p>
            </div>
        </div>
    );
};
