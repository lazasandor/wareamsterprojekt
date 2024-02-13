import React from 'react'
import Header from '../components/Header'
import ProductsDataTable from '../components/ProductsDataTable'
import { Box } from '@mui/material'
const ProductsPage = () => {
  return (
    <div>
       <Box>
        <Header />
        <ProductsDataTable />
      </Box>
 
    </div>
  )
}

export default ProductsPage