import React from 'react'

type TableRowProps =
    {
        params:
        {
            opponent: string,
            resutl: string,
            score: string,
            difficulty:string,
            time: string,

        }
    }

function TableRow({ params }: TableRowProps) {
    return (
        <tr className="border-b bg-[#242424]">
            <th scope="row" className="py-4 px-6 uppercase font-medium whitespace-nowrap ">
               {params.opponent}
            </th>
            <td className="py-4 px-6 uppercase">
               {params.resutl}
            </td>
            <td className="py-4 px-6 uppercase">
                {params.score}
            </td>
            <td className="py-4 px-6 uppercase">
                {params.difficulty}
            </td>
            <td className="py-4 px-6 uppercase">
               {params.time}
            </td>
        </tr>
    )
}

export default TableRow