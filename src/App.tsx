import {useState} from "react"
import Data from "./Data.ts"
import {getSortedRowModel, getPaginationRowModel, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {DateTime} from 'luxon'




const App =() =>{

    const [data, setData] = useState(Data);

    const columns = [
        {
            accessorKey: 'id',
            header: 'Id',
            footer: 'Id',
        },
        {
            header: 'Name',
            footer: 'Name',
            accessorFn: row => `${row.first_name} ${row.last_name}`
        },
        // {
        //     accessorKey: 'first_name',
        //     header: 'First Name',
        //     footer: 'First Name',
        // },
        // {
        //     accessorKey: 'last_name',
        //     header: 'Last Name',
        //     footer: 'Last Name',
        // },
        {
            accessorKey: 'email',
            header: 'Email',
            footer: 'Email'
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
            footer: 'Gender'
        },
        {
            accessorKey: 'dob',
            header: 'DOB',
            footer: 'DOB',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),

        },
    ]

    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting,
        },
        onSortingChange: setSorting,
    })

    console.log(table.getRowModel().rows)

    return (
        <>
            <p>Hello</p>
<div className='w3-container'>
           <table className='w3-table-all'>
               <thead>
               {table.getHeaderGroups().map(headerGroup =>(
                   <tr key={headerGroup.id}>
                       {headerGroup.headers.map((header) =>(
                           <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                               {flexRender(header.column.columnDef.header,
                               header.getContext())}


                               {
                                   {asc: '⬆️', desc: '⬇️'} [header.column.getIsSorted()?? null]
                               }


                           </th>
                       ))}
                   </tr>
               ))}
               </thead>
               <tbody>
               {table.getRowModel().rows.map(row => (
                   <tr key={row.id}>
                       {row.getVisibleCells().map(cell =>(
                           <td key={cell.id}>
                               {flexRender(cell.column.columnDef.cell,
                                   cell.getContext())}
                           </td>
                       ))}
                   </tr>
               ))}
               </tbody>
               {/*<tfoot>*/}
               {/*{table.getFooterGroups().map(footerGroup =>(*/}
               {/*    <tr key={footerGroup.id}>*/}
               {/*        {footerGroup.headers.map((footer) =>(*/}
               {/*            <th key={footer.id}>*/}
               {/*                {flexRender(footer.column.columnDef.header,*/}
               {/*                    footer.getContext())}*/}
               {/*            </th>*/}
               {/*        ))}*/}
               {/*    </tr>*/}
               {/*))}*/}
               {/*</tfoot>*/}
           </table>
    <div>
        <button onClick={() =>table.setPageIndex(0)}> First Page</button>
        <button
            disabled={!table.getCanPreviousPage()}
            onClick={() =>table.previousPage()}> Previos Page</button>
        <button
            disabled={!table.getCanNextPage()}
            onClick={() =>table.nextPage()}> Next Page</button>
        <button onClick={() => table.setPageIndex(table.getPageCount()-1)}> Last Page</button>
    </div>
</div>

        </>
    )
}

export default App;