
import { Button } from "@/components/ui/button"
import Modal from "./Modal"

interface ModalDeleteUserProps {
    isOpen: boolean
    onConfirm: () => void
    onClose: () => void
    isLoading: boolean
}

const ModalDeleteUser: React.FC<ModalDeleteUserProps> = ({ isOpen, onConfirm, onClose, isLoading }) => {
    return (
        <Modal title="Delete User" description="For sure you want to delete it?" isOpen={isOpen}>
            <div className="w-full flex flex-row justify-end items-center gap-3">
                <Button type="button" disabled={isLoading} variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="button" disabled={isLoading} variant="login" onClick={onConfirm}>Accept</Button>
            </div>
        </Modal>
    )
}

export default ModalDeleteUser
