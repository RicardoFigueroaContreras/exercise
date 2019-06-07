package com.hca.vendingapi.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.hca.vendingapi.exception.BusinessException;
import com.hca.vendingapi.model.Machine;
import com.hca.vendingapi.model.Product;
import com.hca.vendingapi.model.Sale;
import com.hca.vendingapi.model.Status;
import com.hca.vendingapi.repository.SaleRepository;

@RunWith(MockitoJUnitRunner.class)
public class SaleServiceImplTest {

	@Mock
	private SaleRepository saleRepository;

	@Mock
	private MachineService machineService;

	@Mock
	private ProductService productService;

	@InjectMocks
	private SaleServiceImpl saleService;

	Sale sale = new Sale();
	Machine machine = new Machine();
	Product product = new Product();

	@Before
	public void setMockOutput() throws Exception {

		sale.setId(1L);
		sale.setProductId(1L);
		sale.setMachineId(1L);
		sale.setAmountPaid(BigDecimal.valueOf(1));

		machine.setId(1L);
		machine.setAllowDollar(true);
		machine.setDollarStock(10);
		machine.setQuarterStock(10);
		machine.setStatus(Status.HASMONEY);

		product.setId(1L);
		product.setBrand("Cocacola");
		product.setCurrentStock(10);
		product.setMaxStock(10);
		product.setMinStock(10);
		product.setStockStatus(Status.INSTOCK);
		product.setPrice(BigDecimal.valueOf(0.25));

	}

	@Test(expected = BusinessException.class)
	public void createAmountPaidValidationTest() throws Exception {

		sale.setAmountPaid(BigDecimal.valueOf(0.75));

		saleService.create(sale);

	}

	@Test(expected = BusinessException.class)
	public void createCoinStockValidatioinTest() throws Exception {

		machine.setQuarterStock(2);

		when(machineService.getMachine(anyLong())).thenReturn(Optional.of(machine));
		when(productService.getProduct(anyLong())).thenReturn(Optional.of(product));

		saleService.create(sale);

	}

	@Test(expected = BusinessException.class)
	public void createSodaStockValidatioinTest() throws Exception {

		product.setCurrentStock(0);

		when(machineService.getMachine(anyLong())).thenReturn(Optional.of(machine));
		when(productService.getProduct(anyLong())).thenReturn(Optional.of(product));

		saleService.create(sale);

	}

	@Test
	public void createAmountChangeValidationTest() throws BusinessException {

		when(machineService.getMachine(anyLong())).thenReturn(Optional.of(machine));
		when(productService.getProduct(anyLong())).thenReturn(Optional.of(product));

		when(machineService.update(machine)).thenReturn(machine);
		when(productService.update(product)).thenReturn(product);

		when(saleRepository.save(sale)).thenReturn(sale);

		Sale result = saleService.create(sale);

		assertNotNull(result);

		assertEquals(result.getChangeAmount(), BigDecimal.valueOf(0.75));

	}

	@Test(expected = BusinessException.class)
	public void createSodaPriceVsAmountPaidValidatioinTest() throws Exception {

		sale.setAmountPaid(BigDecimal.valueOf(0.25));

		product.setPrice(BigDecimal.valueOf(0.50));

		when(machineService.getMachine(anyLong())).thenReturn(Optional.of(machine));
		when(productService.getProduct(anyLong())).thenReturn(Optional.of(product));

		saleService.create(sale);

	}

	@Test
	public void calculateNewDollarOneStockTest() {

		Integer newDollarStock = saleService.calculateNewDollarStock(10, BigDecimal.valueOf(1));

		assertNotNull(newDollarStock);

		assertTrue(newDollarStock.equals(11));
	}

	@Test
	public void calculateNewDollarZeroStockTest() {

		Integer newDollarStock = saleService.calculateNewDollarStock(10, BigDecimal.valueOf(0));

		assertNotNull(newDollarStock);

		assertTrue(newDollarStock.equals(10));
	}

	@Test
	public void calculateNewQuarterStockAddOneTest() {

		Integer newDollarStock = saleService.calculateNewQuarterStock(10, 0);

		assertNotNull(newDollarStock);

		assertTrue(newDollarStock.equals(11));
	}

	@Test
	public void calculateNewQuarterStockMinusCoinsTest() {

		Integer newDollarStock = saleService.calculateNewQuarterStock(10, 3);

		assertNotNull(newDollarStock);

		assertTrue(newDollarStock.equals(7));
	}
}
