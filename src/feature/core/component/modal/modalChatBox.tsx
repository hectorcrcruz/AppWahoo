import { Modal } from "../../ui/Modal"
import { ChatBox } from "../chatBox/chatBox"
import { IoIosCloseCircle } from "react-icons/io";


type modalChatBoxProps = {
    showModal: boolean;
    onSucces: () => void;

}

export const ModalChatBox:React.FC<modalChatBoxProps> = ({showModal, onSucces}) => {

  return (
   <Modal  show={showModal} size='sm' className='shadow-2xl w-full rounded-3xl'>
               <Modal.Body>
                 
                   <div>
                      <ChatBox />
                   </div>
                   <div className="justify-end items-center space-x-5 mt-3 absolute top-3 right-3">
                       <button className="  rounded-full"
                           onClick={() => onSucces()}>
                          <IoIosCloseCircle className="h-7 w-7 text-primary-600 hover:text-primary-800" />
                       </button>
                       </div>
               </Modal.Body>
           </Modal>
  )
}

