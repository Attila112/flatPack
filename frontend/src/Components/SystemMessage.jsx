export default function SystemMessage({message, messageType = 'default'}){
    const messageTypes = {
        'error' : 'error',
        'confirm' : 'confirm',
        'default' : ''
    };

    return (
        <div>
            <h3 className={messageTypes[messageType]}>
                {message}
            </h3>
        </div>
    );
}