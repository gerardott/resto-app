import React, { useState } from 'react';
import { Form, Button, Modal, Row } from 'antd';
import { FormProps } from 'antd/lib/form';

const defaultSize = {
  labelSize: 8,
  filedSize: 16
}
type Mode = 'create' | 'edit' | 'view';
const toTitleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface ModalInstance {
  isOpen: boolean;
  mode: Mode;
}

interface ModalFormProps extends FormProps {
  modal: ModalInstance;
  entityName: string;
  isEditing?: boolean;
  isOpen?: boolean;
  labelSize?: number;
  width?: string | number;
  onCreateNew?: () => void;
  onCancel: () => void;
}

const ModalForm: React.FC<ModalFormProps> = (props) => {
  const fakeModal = { isOpen: props.isOpen, mode: 'create'};
  const {
    form, modal = fakeModal, entityName, isEditing, isOpen, labelSize, width,
    onCreateNew, onCancel, children, ...formProps
  } = props;
  const title = `${toTitleCase(modal.mode)} ${entityName}`;
  const hasCreateButton = !!onCreateNew;
  const fieldSize = 24 - labelSize!;
  const formSettings = {
    labelCol: { span: labelSize || defaultSize.labelSize, },
    wrapperCol: { span: fieldSize || defaultSize.filedSize, }
  };
  const saveIcon = <i className="fas fa-save"></i>;
  const cancelIcon = <i className="fas fa-times"></i>;

  const hndModalCancel = () => {
    if (onCancel) onCancel();
  }

  const submitForm = () => {
    if (form) form.submit();
  }

  let footer = null;
  if (modal.mode === 'view') {
    footer = [<Button key="back" type="default" onClick={hndModalCancel} icon={cancelIcon}>Close</Button>];
  }
  else {
    footer = [
      <Button key="back" type="default" onClick={hndModalCancel} icon={cancelIcon}>Cancel</Button>,
      <Button key="submit" type="primary" onClick={submitForm} icon={saveIcon}>Save</Button>
    ];
  }

  return (
    <>
      {
        hasCreateButton &&
        <Row justify="end" style={{ marginBottom: '16px' }}>
          <Button type="primary" onClick={onCreateNew}>Create New <i className="fas fa-plus"></i></Button>
        </Row>
      }
      <Modal
        title={title}
        visible={modal.isOpen}
        centered={true}
        width={width}
        onCancel={hndModalCancel}
        footer={footer}
      >
        <Form form={form}
          layout="horizontal"
          size="middle"
          {...formSettings}
          {...formProps}
          style={{ maxHeight: '500px', overflowY: 'auto', padding: '2px 12px' }}
        >
          {children}
        </Form>
      </Modal>
    </>
  )
}

export function useModalFormMock(form: any, list: any[], setList: any) {
  const [modal] = useModalForm(form);

  const onFinish = (values: any) => {
    if (values.id != null) {
      const item = list.find(x => x.id === values.id);
      Object.assign(item, values);
    }
    else {
      values.id = list.length + 1;
      setList([...list, { ...values }]);
    }
    form.resetFields();
    modal.close();
  };

  const onDelete = (record: any, idx: number) => {
    const listClone = [...list];
    listClone.splice(idx, 1);
    setList(listClone);
  };
  const handlers = { ...modal.handlers, onDelete };
  const actions = { ...modal.actions, onFinish };

  const modalMock = { ...modal, handlers, actions };
  return [modalMock];
}

export function useModalForm(form: any) {
  const [mode, setMode] = useState<Mode>('create');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onCreateNew = () => {
    form.resetFields();
    setMode('create');
    setIsOpen(true);
  }

  const onModalCancel = () => {
    form.resetFields();
    setIsOpen(false);
  }

  const onEdit = (record: any) => {
    form.setFieldsValue(record);
    setMode('edit');
    setIsOpen(true);
  }
  const onView = (record: any) => {
    form.setFieldsValue(record);
    setMode('view');
    setIsOpen(true);
  }
  const handlers = { onEdit, onView };
  const actions = { onCreateNew, onModalCancel };

  const modal = { isOpen, mode, handlers, actions, open, close };
  return [modal];
}

export default ModalForm;
