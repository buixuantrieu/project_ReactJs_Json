/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { Checkbox, Button, Table, Spin, Form, Input, Upload, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { v4 as uid } from "uuid";
import dayjs from "dayjs";

import {
  createCategoryRequest,
  getCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
  getCategoryDeletedRequest,
} from "../../../redux/slicers/category.slice";
import { uploadImageRequest } from "../../../redux/slicers/common.slice";

import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { IoMdClose } from "react-icons/io";
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
    dispatch(getCategoryRequest({ keywords: null }));
    dispatch(getCategoryDeletedRequest());
  }, []);
  const { categoryList } = useSelector((state) => state.category);
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
    categoryList.deleted.map(
      (item, index) => {
        return {
          key: index,
          name: item.name,
          operation: (
            <Button
              onClick={() => {
                dispatch(
                  deleteCategoryRequest({
                    id: item.id,
                    status: false,
                    callback: () => {
                      dispatch(getCategoryRequest({ keywords: null }));
                      dispatch(getCategoryDeletedRequest());
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
      [categoryList.deleted]
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
      title: "Category Name",
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
    const categoryListDetail = categoryList.data.filter((item) => item.id === id);
    updateForm.setFieldsValue({
      categoryName: categoryListDetail[0].name,
      des: categoryListDetail[0].des,
    });
    setFileList([]);
    setIdUpdate(id);
  };
  const handleDeleteCategory = (id) => {
    dispatch(
      deleteCategoryRequest({
        id: id,
        status: true,
        callback: () => {
          dispatch(getCategoryRequest({ keywords: null }));
          dispatch(getCategoryDeletedRequest());
        },
      })
    );
    message.success("Delete Category successfully!");
  };
  const data = useMemo(() => {
    return categoryList.data.map((item, index) => {
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
  }, [categoryList.data]);

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
            createCategoryRequest({
              data: {
                id,
                name: values.categoryName,
                des: values.des,
                image: filenames[0],
              },
            })
          );
        },
        callbackTwo: () => {
          dispatch(getCategoryRequest({ keywords: null }));
        },
      })
    );
    message.success("Create Category successfully!");
    addForm.resetFields();
  };
  const handleSubmitFormUpdate = async (values) => {
    if (fileList.length !== 0) {
      const formData = new FormData();
      values.upload.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      dispatch(
        uploadImageRequest({
          formData: formData,
          callback: (filenames) => {
            dispatch(
              updateCategoryRequest({
                data: {
                  name: values.categoryName,
                  des: values.des,
                  image: filenames[0],
                },
                id: idUpdate,
              })
            );
          },
          callbackTwo: () => {
            dispatch(getCategoryRequest({ keywords: null }));
          },
        })
      );
    } else {
      dispatch(
        updateCategoryRequest({
          data: {
            name: values.categoryName,
            des: values.des,
          },
          id: idUpdate,
          callback: () => {
            dispatch(getCategoryRequest({ keywords: null }));
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
        deleteCategoryRequest({
          id: item.id,
          status: true,
          callback: () => {
            dispatch(getCategoryRequest({ keywords: null }));
            dispatch(getCategoryDeletedRequest());
          },
        })
      )
    );
    setSelectedRowKeys([]);
    message.success("Delete Category Successfully!");
  };

  return (
    <S.CategoryWrapper>
      <S.CategoryTitle>Category Management</S.CategoryTitle>
      <S.StatisticalWrapper>
        <S.StatisticalItem $themLight={themeLight}>
          <S.StatisticalItemTitle>Quantity</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>{categoryList.data.length}</S.StatisticalItemNumber>
        </S.StatisticalItem>
        <S.StatisticalItem $themLight={themeLight}>
          <S.StatisticalItemTitle>Best-selling</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>Cartier</S.StatisticalItemNumber>
        </S.StatisticalItem>
        <S.StatisticalItem $themLight={themeLight} onClick={() => setShowDeleted(true)}>
          <S.StatisticalItemTitle>Deleted.</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>{categoryList.deleted.length}</S.StatisticalItemNumber>
        </S.StatisticalItem>
      </S.StatisticalWrapper>
      <S.SearchWrapper>
        <Button type="primary" onClick={() => setShowPopupAdd(!showPopupAdd)} style={{ marginBottom: "12px" }}>
          Create Category
        </Button>
        <Input
          style={{ width: 500, height: 35 }}
          placeholder="input search text"
          onChange={(e) => dispatch(getCategoryRequest({ keywords: e.target.value }))}
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
            <S.CategoryTitle>Create Category</S.CategoryTitle>
            <Form.Item
              label="Category Name:"
              name="categoryName"
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
              label="Category Name:"
              name="categoryName"
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
