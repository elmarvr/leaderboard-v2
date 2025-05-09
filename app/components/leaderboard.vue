<script setup lang="ts">
import {
  useVueTable,
  FlexRender,
  type ColumnDef,
  getCoreRowModel,
} from "@tanstack/vue-table";
import type { User } from "~~/server/utils/drizzle";

type UserColumnData = Pick<User, "id" | "name">;

const props = defineProps<{
  data: UserColumnData[];
}>();

const columns: ColumnDef<UserColumnData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

const table = useVueTable({
  data: props.data,
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="rounded-md border">
    <UiTable>
      <UiTableHeader>
        <UiTableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <UiTableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <UiTableRow :data-state="row.getIsSelected() && 'selected'">
              <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="row.getIsExpanded()">
              <UiTableCell :colspan="row.getAllCells().length">
                {{ JSON.stringify(row.original) }}
              </UiTableCell>
            </UiTableRow>
          </template>
        </template>

        <UiTableRow v-else>
          <UiTableCell :colspan="columns.length" class="h-24 text-center">
            No results.
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>
