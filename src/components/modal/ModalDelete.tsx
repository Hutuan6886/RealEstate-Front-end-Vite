import Modal from "./Modal"

import { Button } from "@/components/ui/button"

interface ModalDeleteProps {
    title: string;
    description?: string
    isOpen: boolean
    onConfirm: () => void
    onClose: () => void
    isLoading?: boolean
}

const ModalDeleteUser: React.FC<ModalDeleteProps> = ({ title, description, isOpen, onConfirm, onClose, isLoading }) => {
    return (
        <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
            <div className="md:w-full flex flex-row justify-end items-center gap-3">
                <Button type="button" disabled={isLoading} variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="button" disabled={isLoading} variant="login" onClick={onConfirm}>Accept</Button>
            </div>
        </Modal>
    )
}

export default ModalDeleteUser
