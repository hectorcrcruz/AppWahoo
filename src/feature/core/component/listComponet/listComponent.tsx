import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Table } from '../../ui/Table';
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import Tooltip from '../../ui/Tooltip/Tooltip';
import { ModalActions } from '../modal';
import { useMemo, useState } from 'react';
import dayjs from "dayjs";
import { useNavigate, useLocation } from 'react-router-dom';


export interface ListComponentProps<T extends { id: number }> {
  dataList: T[];
  module: string;
}

export const ListComponent = <T extends { id: number; imagen?: string }>(
  { dataList, module }: ListComponentProps<T>
) => {
  const [showModal, setShowModal] = useState(false);
  const [idCustomer, setIdCustomer] = useState<number | string>(0);
  const columnHelper = createColumnHelper<T>();


  const location = useLocation();
  const locationSearch = location.pathname.includes('/home/voucher');

  const navigatee = useNavigate();
  const handleUpdate = (path: string, id: number) => {
    navigatee(`/home/${path}/actualizarPage/${id}`);
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    acciones: !locationSearch,
    categoriaProductoId: false,
    imagenProducto:false,
    id:false
  });

  const columns = useMemo(() => {
    if (dataList.length === 0) return [];

    const keys = Object.keys(dataList[0] ?? {}) as (keyof T)[];

    return [
      columnHelper.accessor("id" as any, {
        id: 'id',
        header: () => <div className="font-normal text-center whitespace-nowrap">Id</div>,
        cell: ({ getValue }) => <div className="text-center whitespace-nowrap">{String(getValue())}</div>,
      }),

     

      // si hay imagen y locationSearch es verdadero, renderizamos imagen
      ...(locationSearch && 'imagen' in dataList[0]! ?
        [columnHelper.accessor('imagen' as any, {
          id: 'imagen',
          header: () => <div className="font-normal text-center">Imagen</div>,
          cell: ({ getValue }) => (
            <div className="flex justify-center">
              <img src={String(getValue())} alt="Imagen" className="w-16 h-16 object-cover rounded-md" />
            </div>
          )
        })] : []),

       

      ...keys
        .filter((key) => ![
          'id', 'usuarioId', 'estado', 'usuarioAdd', 'usuarioUp', 'circulacion',
          'login', 'password', 'fechaAdd', 'fechaUp',
          'imagenUsuario', 'direccionUsuario', 'causacionPagos',
          'expedicionCedula', 'tipoIdentificacionId', 'licenciaConduccion',
          'imagen' // si ya renderizamos imagen por separado
        ].includes(String(key)))
        .map((key) =>
          columnHelper.accessor(key as any, {
            id: String(key),
            header: () => {
              const headerText = String(key);
              const truncated = headerText.length > 5 ? headerText.substring(0, 7) + "..." : headerText;
              return (
                <div className="font-normal text-center capitalize whitespace-nowrap">
                  <Tooltip text={headerText} position="bottom">
                    {truncated}
                  </Tooltip>
                </div>
              );
            },
            cell: ({ getValue }) => {
              const value = getValue();
              const formatted = typeof value === "string" && value.includes("T")
                ? dayjs(value).format("DD-MM-YYYY")
                : String(value);
              return <div className="text-center truncate overflow-hidden">{formatted}</div>;
            },
          })
        ),
      columnHelper.display({
        id: 'acciones',
        header: () => <div className="md:w-40 font-normal text-center">Acciones</div>,
        cell: ({ row }) => (
          <div className="flex justify-center space-x-4">
            <Tooltip text="Información">
              <LuInfo onClick={() => { setShowModal(true); setIdCustomer(row.original.id); }} className="w-5 h-5 cursor-pointer text-[#a20f5c]" />
            </Tooltip>
            <Tooltip text="Actualizar">
              <GrUpdate onClick={() => handleUpdate(module, row.original.id)} className="w-5 h-5 cursor-pointer text-[#a20f5c]" />
            </Tooltip>
            <Tooltip text="Eliminar">
              <MdDeleteOutline className="w-5 h-5 cursor-pointer text-[#a20f5c]" />
            </Tooltip>
          </div>
        ),
      }),
    ];
  }, [dataList, locationSearch]);

  const table = useReactTable({
    columns,
    data: dataList,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    initialState: { columnVisibility },
  });

  return (
    <>
      <section>
        <Table className="table-previous md:w-full md:table-fixed">
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id} className="bg-primary-50 rounded-lg overflow-hidden text-sm">
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell key={header.id} className="text-center">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
          <Table.Body className="bg-white">
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} className="!bg-white text-sm">
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} className="!bg-white">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
            {dataList.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={table.getAllColumns().length} className="italic text-center text-gray-600 font-extrabold !bg-white text-sm">
                  Sin registros.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </section>
      <ModalActions
        id={idCustomer}
        title="Información"
        icon={<LuInfo className="h-10 w-10 text-primary" />}
        onSucces={() => setShowModal(false)}
        showModal={showModal}
      />
    </>
  );
};
