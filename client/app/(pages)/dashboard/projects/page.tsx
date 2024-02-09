'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from '@nextui-org/react'
import { columns, statusOptions } from './data'
import { VerticalDotsIcon } from '@/app/components/icons/VerticalDotsIcon'
import { ChevronDownIcon, PlusIcon, SearchIcon } from 'lucide-react'
import { capitalize } from 'lodash-es'
import { Project } from '@/types/Project'
import { getProjects } from '@/functions/getProjects/getProjects'
import CreateProjectModal from '@/app/components/dashboard/project/CreateProjectModal'
import UpdateProjectModal from '@/app/components/dashboard/project/UpdateProjectModal'
import { useDisclosure } from '@nextui-org/modal'
import api from '@/services/api'

const statusColorMap: Record<string, ChipProps['color']> = {
  true: 'success',
  false: 'danger'
}

const INITIAL_VISIBLE_COLUMNS = ['id', 'title', 'description', 'is_published', 'actions']

export default function App() {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const [statusFilter, setStatusFilter] = useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [projects, setProjects] = useState<Project[]>([] as Project[])
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending'
  })


  useEffect(() => {
    (async () => {
      const res = await getProjects(true)
      setProjects(res as Project[])
    })()
  }, [])

  async function handleDelete(project: Project) {
    await api.delete(`api/v1/projects/${project.id}`)
    const newProjects = await getProjects()
    setProjects(newProjects as Project[])
  }

  const [page, setPage] = React.useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredProjects = [...projects]

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter((project) =>
          project.title.toLowerCase().includes(filterValue.toLowerCase()) || project.id.toString().includes(filterValue.toLowerCase())
      )
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredProjects = filteredProjects.filter((project) =>
          Array.from(statusFilter).includes(String(project.is_published))
      )
    }

    return filteredProjects
  }, [projects, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Project, b: Project) => {
      const first = a[sortDescriptor.column as keyof Project] as unknown as number
      const second = b[sortDescriptor.column as keyof Project] as unknown as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((project: Project, columnKey: React.Key) => {
    const cellValue = project[columnKey as keyof Project]

    switch (columnKey) {
      case 'title':
        return (
            <div className="flex flex-col">
              <p className="text-bold text-tiny capitalize text-default-400">{project.title}</p>
            </div>
        )
      case 'description':
        return (
            <div className="flex flex-col">
              <p className="text-bold text-tiny capitalize text-default-400">{project.description}</p>
            </div>
        )
      case 'is_published':
        return (
            <Chip className="capitalize" color={statusColorMap[String(project.is_published)]} size="sm" variant="flat">
              {project.is_published ? 'Published' : 'Unpublished'}
            </Chip>
        )
      case 'actions':
        return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300"/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>test {project.title}</DropdownItem>
                  <DropdownItem onClick={() => handleDelete(project)}>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
        )
      default:
        // @ts-ignore
        return <div>{cellValue}</div>
    }
  }, [])

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<SearchIcon/>}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <CreateProjectModal projects={projects} setProjects={setProjects} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {projects.length} Projects</span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    projects.length,
    hasSearchFilter
  ])

  const bottomContent = React.useMemo(() => {
    return (
        <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
              ? 'All items selected'
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
          <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
          />
          <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
              Previous
            </Button>
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
              Next
            </Button>
          </div>
        </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
      <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: 'max-h-[382px]'
          }}
          selectedKeys={selectedKeys}
          selectionMode="none"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
              <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                  allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No projects found'} items={sortedItems}>
          {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
          )}
        </TableBody>
      </Table>
  )
}
