
import Modal from 'react-modal';
import { ModalProp } from './ModalInterface';
import { RiCloseLargeLine } from 'react-icons/ri';
import Title from '../text/Title';

const DEFAULT_MODAL_STYLES = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '500px',
        height: '400px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const TITLE_STYLES = {
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',

};

export default function DefaultModal({
    children,
    title,
    isOpen,
    setIsOpen,
    styles }: ModalProp) {

    const closeModal = () => {
        setIsOpen(false);
    }

    return <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={styles ? styles : DEFAULT_MODAL_STYLES}>
        <div style={{ textAlign: 'right' }}
            onClick={closeModal}>
            <RiCloseLargeLine
                style={{ cursor: 'pointer' }}
                size='1.2em'
                color='gray' />
        </div>
        <Title name={title} style={TITLE_STYLES}/>
        {children}
    </Modal>
}