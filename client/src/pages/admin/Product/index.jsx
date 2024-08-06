/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Checkbox, Button, Table, Spin, Form, Input, Upload, message, Select } from "antd";

import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uid } from "uuid";
import dayjs from "dayjs";

import {
  createProductRequest,
  getProductRequest,
  updateProductRequest,
  deleteProductRequest,
  getProductDeletedRequest,
} from "../../../redux/slicers/product.slice";
import { getCategoryRequest } from "../../../redux/slicers/category.slice";
import { getTypeRequest } from "../../../redux/slicers/type.slice";
import { uploadImageRequest } from "../../../redux/slicers/common.slice";

import * as S from "./styles";
import { b64EncodeUnicode, b64DecodeUnicode } from "../../../ultils/file";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";

function Category() {
  const { Option } = Select;
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const dispatch = useDispatch();
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectForm, setSelectForm] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [contentProduct, setContentProduct] = useState("");
  const [initialValueEditor, setInitialValueEditor] = useState("");
  const [valueUpdate, setValueUpdate] = useState("");
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const searchParams = {
    categoryId: [],
    typeId: [],
    keywords: null,
  };

  const [idUpdate, setIdUpdate] = useState("");
  useEffect(() => {
    dispatch(getProductRequest({ ...searchParams }));
    dispatch(getProductDeletedRequest());
    dispatch(getTypeRequest({ keywords: null }));
    dispatch(getCategoryRequest({ keywords: null }));
  }, []);
  const { categoryList } = useSelector((state) => state.category);
  const { typeList } = useSelector((state) => state.type);
  const { productList } = useSelector((state) => state.product);
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
  const renderOptionCategory = useMemo(() =>
    categoryList.data.map((item, index) => {
      return (
        <Option key={index} value={item.id}>
          {item.name}
        </Option>
      );
    })
  );
  const renderOptionType = useMemo(() =>
    typeList.data.map((item, index) => {
      return (
        <Option key={index} value={item.id}>
          {item.name}
        </Option>
      );
    })
  );
  const deletedData = useMemo(() =>
    productList.deleted.map(
      (item, index) => {
        return {
          key: index,
          name: item.name,
          operation: (
            <Button
              onClick={() => {
                dispatch(
                  deleteProductRequest({
                    id: item.id,
                    status: false,
                    callback: () => {
                      dispatch(getProductRequest({ ...searchParams }));
                      dispatch(getProductDeletedRequest());
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
      [productList.deleted]
    )
  );
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
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
  const handleEditorChange = (content, editor) => {
    setContentProduct(content);
  };
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
    const productListDetail = productList.data.filter((item) => item.id === id);
    updateForm.setFieldsValue({
      productName: productListDetail[0].name,
      price: productListDetail[0].price,
      category: productListDetail[0].category.id,
      type: productListDetail[0].type.id,
    });
    setInitialValueEditor(b64DecodeUnicode(productListDetail[0].des));
    setFileList([]);
    setIdUpdate(id);
  };
  const handleDeleteCategory = (id) => {
    dispatch(
      deleteProductRequest({
        id: id,
        status: true,
        callback: () => {
          dispatch(getProductRequest({ ...searchParams }));
          dispatch(getProductDeletedRequest());
        },
      })
    );
    message.success("Delete Category successfully!");
  };
  const data = useMemo(() => {
    return productList.data.map((item, index) => {
      return {
        key: index,
        id: item.id,
        code: <strong>{item.id.substring(0, 4).toUpperCase()}</strong>,
        image: <S.ImageContainer $image={item.image} />,
        name: <h4>{item.name}</h4>,
        category: item.category.name,
        type: item.type.name,
        price: <strong>{item.price}.$</strong>,
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
  }, [productList.data]);

  const handleSubmitFormCreate = async (values) => {
    const id = uid();
    const formData = new FormData();
    values.upload.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    const btoaDes = b64EncodeUnicode(contentProduct);
    dispatch(
      uploadImageRequest({
        formData: formData,
        callback: (filenames) => {
          dispatch(
            createProductRequest({
              data: {
                id,
                name: values.productName,
                des: btoaDes,
                price: Number(values.price),
                categoryId: values.category,
                typeId: values.type,
                image: filenames[0],
              },
            })
          );
        },
        callbackTwo: () => {
          dispatch(getProductRequest({ ...searchParams }));
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
              updateProductRequest({
                data: {
                  name: values.productName,
                  des: b64EncodeUnicode(valueUpdate),
                  categoryId: values.category,
                  typeId: values.type,
                  price: values.price,
                  image: filenames[0],
                },
                id: idUpdate,
              })
            );
          },
          callbackTwo: () => {
            dispatch(getProductRequest({ ...searchParams }));
          },
        })
      );
    } else {
      dispatch(
        updateProductRequest({
          data: {
            name: values.productName,
            des: b64EncodeUnicode(valueUpdate),
            categoryId: values.category,
            typeId: values.type,
            price: values.price,
          },
          id: idUpdate,
          callback: () => {
            dispatch(getProductRequest({ ...searchParams }));
          },
        })
      );
    }
    message.success("update Category successfully!");
    updateForm.resetFields();
    setShowPopupUpdate(!showPopupUpdate);
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
        deleteProductRequest({
          id: item.id,
          status: true,
          callback: () => {
            dispatch(getProductRequest({ ...searchParams }));
            dispatch(getProductDeletedRequest());
          },
        })
      )
    );
    setSelectedRowKeys([]);
    message.success("Delete Category Successfully!");
  };
  return (
    <S.CategoryWrapper>
      <S.PopupCreateCategory $showPopup={showPopupAdd}>
        <S.ExitPopupAdd onClick={() => setShowPopupAdd(!showPopupAdd)}>
          <IoMdClose />
        </S.ExitPopupAdd>
        <Form
          form={addForm}
          name="addForm"
          onFinish={handleSubmitFormCreate}
          layout="vertical"
          style={{ width: "100%", padding: "16px" }}
        >
          <S.CategoryTitle>Create Product</S.CategoryTitle>
          <Form.Item
            label="Product Name:"
            name="productName"
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
            label="Category:"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
          >
            <Select>{renderOptionCategory}</Select>
          </Form.Item>
          <Form.Item
            label="Type:"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
          >
            <Select>{renderOptionType}</Select>
          </Form.Item>
          <Form.Item
            label="Price:"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <Input type="number" />
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

          <Editor
            style={{ width: "100%" }}
            apiKey="wx24lnxfdf57f0ws653fif0kkt3bggp0rz6snp9d9uzv3zib"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              setup: (editor) => {
                editor.on("GetContent", (e) => {
                  if (e.format === "html") {
                    e.content = e.content.replace(/<img([^>]*)>/g, "<img$1 />");
                  }
                });
              },
            }}
            initialValue="<h1>hello<h1/>"
            onEditorChange={handleEditorChange}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </S.PopupCreateCategory>
      <S.CategoryTitle>Product Management</S.CategoryTitle>
      <S.StatisticalWrapper>
        <S.StatisticalItem $themLight={themeLight}>
          <S.StatisticalItemTitle>Quantity</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>{productList.data.length}</S.StatisticalItemNumber>
        </S.StatisticalItem>
        <S.StatisticalItem $themLight={themeLight}>
          <S.StatisticalItemTitle>Best-selling</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>Cartier</S.StatisticalItemNumber>
        </S.StatisticalItem>
        <S.StatisticalItem $themLight={themeLight} onClick={() => setShowDeleted(true)}>
          <S.StatisticalItemTitle>Deleted.</S.StatisticalItemTitle>
          <S.StatisticalItemNumber>{productList.deleted.length}</S.StatisticalItemNumber>
        </S.StatisticalItem>
      </S.StatisticalWrapper>
      <S.SearchWrapper>
        <Button type="primary" onClick={() => setShowPopupAdd(!showPopupAdd)} style={{ marginBottom: "12px" }}>
          Create Product
        </Button>
        <Input
          style={{ width: 500, height: 35 }}
          placeholder="input search text"
          onChange={(e) => dispatch(getProductRequest({ ...searchParams, keywords: e.target.value }))}
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

      <S.PopupUpdateCategory $showPopupUpdate={showPopupUpdate}>
        <S.FormCreateCategory style={{ width: "100%" }}>
          <S.ExitPopupAdd onClick={() => setShowPopupUpdate(!showPopupUpdate)}>
            <IoMdClose />
          </S.ExitPopupAdd>
          <Form
            form={updateForm}
            name="updateForm"
            onFinish={handleSubmitFormUpdate}
            layout="vertical"
            style={{ width: "100%" }}
          >
            <S.CategoryTitle>Update Category</S.CategoryTitle>
            <Form.Item
              label="product Name:"
              name="productName"
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
              label="Category:"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please input category name!",
                },
              ]}
            >
              <Select>{renderOptionCategory}</Select>
            </Form.Item>
            <Form.Item
              label="Type:"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input category name!",
                },
              ]}
            >
              <Select>{renderOptionType}</Select>
            </Form.Item>
            <Form.Item
              label="Price:"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price!",
                },
              ]}
            >
              <Input type="number" />
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
            <Form.Item>
              <Editor
                style={{ width: "100%" }}
                apiKey="wx24lnxfdf57f0ws653fif0kkt3bggp0rz6snp9d9uzv3zib"
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  setup: (editor) => {
                    editor.on("GetContent", (e) => {
                      if (e.format === "html") {
                        e.content = e.content.replace(/<img([^>]*)>/g, "<img$1 />");
                      }
                    });
                  },
                }}
                initialValue={initialValueEditor}
                onEditorChange={(value) => setValueUpdate(value)}
              />
            </Form.Item>
            <Form.Item>
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
