package com.hca.vendingapi.service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hca.vendingapi.commons.Constants.Currency;
import com.hca.vendingapi.exception.BusinessException;
import com.hca.vendingapi.model.Machine;
import com.hca.vendingapi.model.Product;
import com.hca.vendingapi.model.Sale;
import com.hca.vendingapi.model.Status;
import com.hca.vendingapi.repository.SaleRepository;

/**
 * 
 * This class allow to manage all business transactions related with Sale table
 * 
 * @author Ricardo Figueroa
 * @since 2019
 * 
 */
@Service
public class SaleServiceImpl implements SaleService {

	private static final Logger logger = LogManager.getLogger(SaleServiceImpl.class);

	@Autowired
	private SaleRepository saleRepository;

	@Autowired
	private MachineService machineService;

	@Autowired
	private ProductService productService;

	@Override
	public Sale create(Sale sale) throws BusinessException {

		logger.debug("::: Begin sale process :::");

		if (!Currency.QUARTER.equals(sale.getAmountPaid()) && !Currency.DOLLAR.equals(sale.getAmountPaid())) {
			logger.error("The Machine supports only 25C or 1$");
			throw new BusinessException("The Machine supports only 25C or 1$");
		}

		/*
		 * Retrieve information about the machine and the drink selected
		 */
		Optional<Machine> machine = machineService.getMachine(sale.getMachineId());
		Optional<Product> product = productService.getProduct(sale.getProductId());
		
		/*
		 * Obtaining the current machine money stock 
		 */
		Integer currentQuarterStock = machine.get().getQuarterStock();
		Integer currentDollarStock = machine.get().getDollarStock();
		
		/*
		 * Calculating the change amount and calculating the quarters change coins 
		 */
		BigDecimal changeAmount = sale.getAmountPaid().subtract(product.get().getPrice());
		Integer changeCoins = changeAmount.divide(Currency.QUARTER).intValue();
		
		/*
		 * Calculating the new quarter coins and one dollar stock
		 */
		Integer newQuarterStock = calculateNewQuarterStock(currentQuarterStock, changeCoins);
		Integer newDollarStock = calculateNewDollarStock(currentDollarStock, sale.getAmountPaid());

		/*
		 * Calculating the new soda stock
		 */
		Integer currentSodaStock = product.get().getCurrentStock();
		Integer newSodaStock = currentSodaStock - BigInteger.ONE.intValue();

		/*
		 * Validations
		 */
		if (sale.getAmountPaid().compareTo(product.get().getPrice()) < 0) { 
			logger.error("Not enough coins to buy the soda");
			throw new BusinessException("Not enough coins to buy the soda");
		}
		
		if (currentQuarterStock < changeCoins) {
			logger.error("Not enough coins for change, please enter a quarter");
			throw new BusinessException("Not enough coins for change, please enter a quarter");
		}

		if (currentSodaStock.equals(BigInteger.ZERO.intValue())) {
			logger.error(String.format("Out of %s, sorry", product.get().getBrand()));
			throw new BusinessException(String.format("Out of %s, sorry", product.get().getBrand()));
		}
		
		/*
		 * Setting all calculated variables
		 */
		sale.setChangeAmount(changeAmount);
		sale.setAmount(product.get().getPrice());
		sale.setStatus(Status.SODASOLD);

		machine.get().setQuarterStock(newQuarterStock);
		machine.get().setDollarStock(newDollarStock);

		product.get().setCurrentStock(newSodaStock);

		productService.update(product.get());
		
		logger.debug("::: Save Product Stock object[{}]:::", product);
		
		machineService.update(machine.get());

		logger.debug("::: Save Machine Money Stock object[{}]:::", machine);

		sale = saleRepository.save(sale);

		logger.debug("::: Save Sale object[{}]:::", sale);
		
		logger.debug("::: End sale process :::");
		
		return sale;

	}

	/**
	 * This method allow to calculate the new dollar stock
	 * @param currentQuarterStock
	 * @param amountPaid
	 * @return
	 */
	public Integer calculateNewDollarStock(Integer currentQuarterStock, BigDecimal amount) {
		if (amount.equals(Currency.DOLLAR)) {
			return currentQuarterStock + BigInteger.ONE.intValue();
		}
		return currentQuarterStock;
	}

	/**
	 * This method allow to calculate the quarter coins stock
	 * @param currentQuarterStock
	 * @param amountPaid
	 * @return
	 * @throws Exception
	 */
	public Integer calculateNewQuarterStock(Integer currentQuarterStock, Integer changeCoins) {
		if (changeCoins.equals(BigInteger.ZERO.intValue())) {
			return currentQuarterStock + BigInteger.ONE.intValue();
		}
		return currentQuarterStock - changeCoins;
	}

}
