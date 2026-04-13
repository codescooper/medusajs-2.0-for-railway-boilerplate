import { HttpTypes } from "@medusajs/types"
import { Table, Text } from "@medusajs/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <Table.Row className="w-full align-top" data-testid="product-row">
      <Table.Cell className="!bg-transparent !pl-4 py-4 align-top md:!pl-6 md:py-5 w-[96px]">
        <div className="flex w-16 md:w-20">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </Table.Cell>

      <Table.Cell className="!bg-transparent py-4 align-top md:py-5 text-left">
        <div className="flex min-h-full flex-col gap-2">
          <Text
            className="text-sm font-semibold tracking-[-0.02em] text-white md:text-base"
            data-testid="product-name"
          >
            {item.product_title}
          </Text>

          <LineItemOptions
            variant={item.variant}
            data-testid="product-variant"
          />
        </div>
      </Table.Cell>

      <Table.Cell className="!bg-transparent py-4 align-top md:py-5 text-left">
        <Text className="text-sm text-white/70" data-testid="product-quantity">
          {item.quantity}
        </Text>
      </Table.Cell>

      <Table.Cell className="!bg-transparent hidden py-4 align-top md:py-5 small:table-cell text-left">
        <LineItemUnitPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </Table.Cell>

      <Table.Cell className="!bg-transparent !pr-4 py-4 align-top md:!pr-6 md:py-5">
        <div className="flex justify-end text-right">
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
