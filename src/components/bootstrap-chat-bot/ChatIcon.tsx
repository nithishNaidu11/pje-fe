import {
    ChatIconProps,
    PositionClassMapProps
} from 'interfaces/chatBot.interface';

const positionClassMap: PositionClassMapProps = {
    bottomRight: 'position-absolute bottom-0 end-0 translate-middle',
    bottomLeft: 'position-absolute bottom-0 start-0 translate-middle',
    bottom: 'position-absolute bottom-0 start-50 translate-middle',
    top: 'position-absolute top-0  start-50 translate-middle',
    topLeft: 'position-absolute top-0 start-0 translate-middle',
    topRight: 'position-absolute top-0 end-0 translate-middle'
};

export const ChatIcon = ({
    position = 'bottomRight',
    open = false
}: ChatIconProps) => {
    return (
        <div className={positionClassMap[position]}>
            {!open && (
                <></>
                // <MDBBtn
                //     color="primary"
                //     tag="a"
                //     floating
                //     size={size}
                //     onClick={onClick}
                // >
                //     <MDBIcon fas icon={icon} />
                // </MDBBtn>
            )}
        </div>
    );
};
