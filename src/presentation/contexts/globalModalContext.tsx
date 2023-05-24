import { ReactNode, createContext, useState } from "react";
import { EditLocalUserName } from "../components/modals/edit-local-user-name";

export enum ModalTypes {
  edit_local_user_name = 'edit_local_user_name'
}

const ModalComponents = {
  [ModalTypes.edit_local_user_name]: EditLocalUserName
}

type GlobalModalContext = {
  showModal: (modalType: ModalTypes, modalProps?: any) => void
  hideModal: () => void
  store: any
}

const initialState: GlobalModalContext = {
  showModal: () => ({}),
  hideModal: () => ({}),
  store: {}
}

export const GlobalModalContext = createContext(initialState)

export const GlobalModal: React.FC<{ children: ReactNode }> = ({ children } ) => {
  const [store, setStore] = useState<{modalType: ModalTypes | null, modalProps: any}>()
  const { modalType, modalProps } = store || {};

  const showModal = (modalType: ModalTypes, modalProps: any = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps,
    });
  };
 
  const hideModal = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    if(!modalType){
      return null
    }
    const ModalComponent = ModalComponents[modalType]

    return <ModalComponent id="global-modal" {...modalProps}/>

  }

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  )
}