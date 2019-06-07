package com.hca.vendingapi.controller;

import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.hca.vendingapi.model.Sale;
import com.hca.vendingapi.service.SaleService;

@RunWith(MockitoJUnitRunner.class)
public class SaleApiControllerTest {

	@Mock
	private SaleService saleService;

	@InjectMocks
	private SaleApiController controller;

	Sale sale = new Sale();

	@Before
	public void setMockOutput() throws Exception {

		sale.setProductId(1L);
		sale.setMachineId(1L);
		sale.setAmountPaid(BigDecimal.valueOf(1));

		when(saleService.create(sale)).thenReturn(sale);
	}

	@Test
	public void saveSale() throws Exception {

		Sale saleObj = controller.post(sale);

		assertNotNull(saleObj);

	}

}
