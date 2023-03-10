import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  PaginationProps,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { IStock, IWare } from "@/types";
import { easyReadMoney } from "@/utils/convert";
import { useRouter } from "next/router";
import callApi from "@/utils/callApi";
import useNotifications from "@/hooks/useNotifications";

interface Item extends IStock {
  key: React.Key;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const WareTable = ({
  data,
  setData,
  total,
}: {
  data: IWare[];
  setData: Dispatch<SetStateAction<IWare[]>>;
  total: number;
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: IWare) => record._id === editingKey;
  const [showMsg, contextHolder] = useNotifications();

  const edit = (record: Partial<IWare> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record._id as string);
    console.log(data);
  };
  const onChange: PaginationProps["onChange"] = (_page) => {
    router.push(`/danh_sach_hang_hoa?_page=${_page}`);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IWare;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        await callApi
          .editWare(newData[index])
          .then((res) => {
            console.log(res.data);
            showMsg("S???a th??nh c??ng", "success");
            setData(newData);
            setEditingKey("");
          })
          .catch((err) => showMsg("C?? l???i x???y ra", "error"));
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      // console.log(newData[index]);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = async (key: React.Key) => {
    try {
      await callApi.deleteWare(key as string).then((res) => {
        const newData = data.filter((item) => item._id !== key);
        showMsg("Xo?? th??nh c??ng", "success");
        setData(newData);
      });
    } catch (error) {
      showMsg("C?? l???i", "error");
    }
  };
  const columns = [
    {
      title: "T??n h??ng ho??",
      dataIndex: "ten_hang_hoa",
      width: "400px",
      editable: true,
    },
    {
      title: "S??? l?????ng",
      dataIndex: "so_luong_trong_kho",
      width: "100px",
      editable: true,
    },
    {
      title: "????n gi??",
      dataIndex: "gia_ban",
      width: "200px",
      editable: true,
      render: (_: any, record: IWare) => easyReadMoney(Number(record.gia_ban)),
    },
    {
      title: "Gi?? nh???p",
      dataIndex: "gia_nhap",
      width: "200px",
      editable: true,
      render: (_: any, record: IWare) => easyReadMoney(Number(record.gia_nhap)),
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "operation",
      width: "300px",
      render: (_: any, record: IWare) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{ marginRight: 8 }}
            >
              L??u l???i
            </Typography.Link>
            <Popconfirm title="B???n mu???n hu????" onConfirm={cancel}>
              <a>Hu???</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              S???a
            </Typography.Link>
            <Popconfirm
              title="Ch???c ch???n xo???"
              onConfirm={() => handleDelete(record._id)}
            >
              <a style={{ color: "red", marginLeft: "8px" }}>Xo??</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IWare) => ({
        record,
        inputType:
          col.dataIndex === "don_gia" || col.dataIndex === "so_luong"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {contextHolder}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          pagination={{
            onChange: onChange,
            current: parseInt(router.query._page as string),
            total: total,
          }}
          bordered
          dataSource={data as IWare[]}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey="_id"
        />
      </Form>
    </>
  );
};

export default WareTable;
