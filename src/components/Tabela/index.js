import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`



 export default function Table({ data }) {

  // <StyledTableCell align="center">Posição</StyledTableCell>
  // <StyledTableCell align="center">Estatus</StyledTableCell>
  // <StyledTableCell align="right">Preço</StyledTableCell>
  // <StyledTableCell align="right">Média</StyledTableCell>
  // <StyledTableCell align="right">M/Valorizar</StyledTableCell>

  const columns = React.useMemo(
    () => [
      {
        Header: 'Informação',
        columns: [
          {
            Header: 'Nome',
            accessor: 'apelido',
          },
          {
            Header: 'Preço',
            accessor: 'preco_num',
          },
          {
            Header: 'Posicão',
            accessor: 'posicao_id',
          },
         
        ],
      },
          
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )
// Não queremos renderizar todas as 2.000 linhas para este exemplo, então cap
   // está em 20 para este caso de uso
  const firstPageRows = rows.slice(0, 20)

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
              // Adicione os adereços de classificação para controlar a classificação. Para este exemplo
                 // podemos adicioná-los nos adereços do cabeçalho
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <br />    
      </Styles>
  )
}



