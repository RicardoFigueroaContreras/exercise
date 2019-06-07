package com.hca.vendingapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hca.vendingapi.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query(value = "SELECT o FROM Product o")
	List<Product> getAllObjects();

	@Query(value = "SELECT o FROM Product o WHERE o.id = :id")
	Optional<Product> getObjectById(@Param("id") Long id);

	@Query(value = "SELECT o FROM Product o WHERE o.machineId = :machineId AND o.currentStock > 0")
	List<Product> getByMachineId(@Param("machineId") Long machineId);

}