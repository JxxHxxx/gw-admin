import DefaultModal from "../../../component/modal/DefaultModal";


export default function RestApiConnectionOneModal({isOpen, setIsOpen, title, pk}) {

    return <DefaultModal
        title={title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}>
        <p>{pk}</p>
    </DefaultModal>
}