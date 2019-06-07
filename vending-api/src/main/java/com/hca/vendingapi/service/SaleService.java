package com.hca.vendingapi.service;

import com.hca.vendingapi.model.Sale;

/**
 * 
 * @author Ricardo Figueroa
 *
 */
public interface SaleService {

	/**
	 * 
	 * @param sale
	 * @return 
	 * @throws Exception
	 */
	Sale create(Sale sale) throws Exception;


}
