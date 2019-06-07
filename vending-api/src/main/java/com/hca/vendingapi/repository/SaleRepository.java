package com.hca.vendingapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hca.vendingapi.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

	@Query(value = "SELECT o FROM Sale o")
	List<Sale> getAllObjects();

	@Query(value = "SELECT o FROM Sale o WHERE o.id = :id")
	Optional<Sale> getObjectById(@Param("id") Long id);

}