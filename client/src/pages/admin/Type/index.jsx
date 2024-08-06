import { useState, useEffect, useMemo } from "react";
import { Checkbox, Button, Table, Spin, Form, Input, Upload, message } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uid } from "uuid";
import dayjs from "dayjs";

import {
  createTypeRequest,
  getTypeRequest,
  updateTypeRequest,
  deleteTypeRequest,
  getTypeDeletedRequest,
} from "../../../redux/slicers/type.slice";
import { uploadImageRequest } from "../../../redux/slicers/common.slice";

import * as S from "./styles";
function Category() {
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const dispatch = useDispatch();
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectForm, setSelectForm] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const [idUpdate, setIdUpdate] = useState("");
  useEffect(() => {
    dispatch(getTypeRequest({ keywords: null }));
    dispatch(getTypeDeletedRequest());
  }, []);
  const { typeList } = useSelector((state) => state.type);
  const { themeLight, isShowAdminSidebar } = useSelector((state) => state.common);
  const deletedColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Operation",
      dataIndex: "operation",
    },
  ];
  const deletedData = useMemo(() =>
    typeList.deleted.map(
      (item, index) => {
        return {
          key: index,
          name: item.name,
          operation: (
            <Button
              onClick={() => {
                dispatch(
                  deleteTypeRequest({
                    id: item.id,
                    status: false,
                    callback: () => {
                      dispatch(getTypeRequest({ keywords: null }));
                      dispatch(getTypeDeletedRequest());
                    },
                  })
                );
                message.success("Restore Successfully!");
              }}
              type="primary"
            >
              Restore
            </Button>
          ),
        };
      },
      [typeList.deleted]
    )
  );
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Logo",
      dataIndex: "image",
    },
    {
      title: "Type Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "des",
    },
    {
      title: "Created Date",
      dataIndex: "created",
    },

    {
      title: "Last edited time",
      dataIndex: "update",
    },
    {
      title: "Operation",
      dataIndex: "operation",
    },
  ];
  const filterColumns = useMemo(() => {
    return columns.filter((item) => {
      if (!isShowAdminSidebar && (item.dataIndex === "created" || item.dataIndex === "update")) {
        return false;
      }
      return true;
    });
  }, [isShowAdminSidebar]);
  const handleOpenPopupUpdate = (id) => {
    setShowPopupUpdate(true);
    const typeListDetail = typeList.data.filter((item) => item.id === id);
    updateForm.setFieldsValue({
      typeName: typeListDetail[0].name,
      des: typeListDetail[0].des,
    });
    setFileList([]);
    setIdUpdate(id);
  };
  const handleDeleteCategory = (id) => {
    dispatch(
      deleteTypeRequest({
        id: id,
        status: true,
        callback: () => {
          dispatch(getTypeRequest({ keywords: null }));
          dispatch(getTypeDeletedRequest());
        },
      })
    );
    message.success("Delete Type successfully!");
  };
  const data = useMemo(() => {
    return typeList.data.map((item, index) => {
      return {
        key: index,
        id: item.id,
        code: <strong>{item.id.substring(0, 4).toUpperCase()}</strong>,
        image: <S.ImageContainer $image={item.image} />,
        name: <h4>{item.name}</h4>,
        des: <i style={{ fontSize: 13 }}>{item.des.substring(0, 80) + " ..."}</i>,
        created: <p style={{ fontSize: "12px" }}>{dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>,
        update: <p style={{ fontSize: "12px" }}>{dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</p>,
        operation: (
          <S.OperationContainer>
            <Button type="primary" ghost onClick={() => handleOpenPopupUpdate(item.id)}>
              Edit
            </Button>
            <Button type="primary" danger ghost onClick={() => handleDeleteCategory(item.id)}>
              Delete
            </Button>
          </S.OperationContainer>
        ),
      };
    });
  }, [typeList.data]);

  const handleSubmitFormCreate = async (values) => {
    const id = uid();
    const formData = new FormData();
    values.upload.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    dispatch(
      uploadImageRequest({
        formData: formData,
        callback: (filenames) => {
          dispatch(
            createTypeRequest({
              data: {
                id,
                name: values.typeName,
                des: values.des,
                image: filenames[0],
              },
            })
          );
        },
        callbackTwo: () => {
          dispatch(getTypeRequest({ keywords: null }));
        },
      })
    );
    message.success("Create Category successfully!");
    addForm.resetFields();
  };
  const handleSubmitFormUpdate = async (values) => {
    if (fileList.length != 0) {
      const formData = new FormData();
      values.upload.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      dispatch(
        uploadImageRequest({
          formData: formData,
          callback: (filenames) => {
            dispatch(
              updateTypeRequest({
                data: {
                  name: values.typeName,
                  des: values.des,
                  image: filenames[0],
                },
                id: idUpdate,
              })
            );
          },
          callbackTwo: () => {
            dispatch(getTypeRequest({ keywords: null }));
          },
        })
      );
    } else {
      dispatch(
        updateTypeRequest({
          data: {
            name: values.typeName,
            des: values.des,
          },
          id: idUpdate,
          callback: () => {
            dispatch(getTypeRequest({ keywords: null }));
          },
        })
      );
    }
    message.success("update Category successfully!");
    updateForm.resetFields();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      setSelectForm(selectedRows);
    },
  };
  const handleDeleteItems = () => {
    selectForm.forEach((item) =>
      dispatch(
        deleteTypeRequest({
          id: item.id,
          status: true,
          callback: () => {
            dispatch(getTypeRequest({ keywords: null }));
            dispatch(getTypeDeletedRequest());
          },
        })
      )
    );
    setSelectedRowKeys([]);
    message.success("Delete Category Successfully!");
  };

  return (
    <S.CategoryWrapper>
      <S.CategoryTitle>Type Management</S.CategoryTitle>
      <S.StatisticalWrapper>
        <S.StatisticalItem $themLight={themeLight}>
          <S.StatisticalItemTitle>Quantity</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>{typeList.data.length}</S.StatisticalItemNumber>
        </S.StatisticalItem>
        <S.StatisticalItem $themLight={themeLight}>
          <S.StatisticalItemTitle>Best-selling</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>Cartier</S.StatisticalItemNumber>
        </S.StatisticalItem>
        <S.StatisticalItem $themLight={themeLight} onClick={() => setShowDeleted(true)}>
          <S.StatisticalItemTitle>Deleted.</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>{typeList.deleted.length}</S.StatisticalItemNumber>
        </S.StatisticalItem>
      </S.StatisticalWrapper>

      <S.SearchWrapper>
        <Button type="primary" onClick={() => setShowPopupAdd(!showPopupAdd)} style={{ marginBottom: "12px" }}>
          Create Type
        </Button>
        <Input
          style={{ width: 500, height: 35 }}
          placeholder="input search text"
          onChange={(e) => dispatch(getTypeRequest({ keywords: e.target.value }))}
          size="small"
        />
      </S.SearchWrapper>

      <Spin spinning={false} indicator={<LoadingOutlined style={{ color: "#0e172a" }} />} size="large">
        <Table
          rowSelection={{
            type: Checkbox,
            ...rowSelection,
          }}
          columns={filterColumns}
          dataSource={data}
          //   pagination={false}
        />
      </Spin>
      <S.PopupCreateCategory $showPopup={showPopupAdd}>
        <S.FormCreateCategory>
          <S.ExitPopupAdd onClick={() => setShowPopupAdd(!showPopupAdd)}>
            <IoMdClose />
          </S.ExitPopupAdd>
          <Form
            form={addForm}
            name="addForm"
            onFinish={handleSubmitFormCreate}
            layout="vertical"
            style={{ width: "300px" }}
          >
            <S.CategoryTitle>Create Type</S.CategoryTitle>
            <Form.Item
              label="Type Name:"
              name="typeName"
              rules={[
                {
                  required: true,
                  message: "Please input category name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description:"
              name="des"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Upload
                name="images"
                listType="picture"
                beforeUpload={() => false}
                maxCount={1}
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </S.FormCreateCategory>
      </S.PopupCreateCategory>
      <S.PopupUpdateCategory $showPopupUpdate={showPopupUpdate}>
        <S.FormCreateCategory>
          <S.ExitPopupAdd onClick={() => setShowPopupUpdate(!showPopupUpdate)}>
            <IoMdClose />
          </S.ExitPopupAdd>
          <Form
            form={updateForm}
            name="updateForm"
            onFinish={handleSubmitFormUpdate}
            layout="vertical"
            style={{ width: "300px" }}
          >
            <S.CategoryTitle>Update Category</S.CategoryTitle>
            <Form.Item
              label="Type Name:"
              name="typeName"
              rules={[
                {
                  required: true,
                  message: "Please input category name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description:"
              name="des"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
              <Upload
                name="images"
                listType="picture"
                beforeUpload={() => false}
                maxCount={1}
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </S.FormCreateCategory>
      </S.PopupUpdateCategory>
      <S.PopupShowDeletedWrapper $showDeleted={showDeleted}>
        <S.PopupShowDeleted>
          <S.ExitDeleted>
            <IoMdClose onClick={() => setShowDeleted(false)} />
          </S.ExitDeleted>
          <Table pagination={false} columns={deletedColumns} dataSource={deletedData}></Table>
        </S.PopupShowDeleted>
      </S.PopupShowDeletedWrapper>
      <Button onClick={handleDeleteItems} disabled={selectForm.length === 0} danger>
        Delete selected items
      </Button>
    </S.CategoryWrapper>
  );
}
export default Category;
