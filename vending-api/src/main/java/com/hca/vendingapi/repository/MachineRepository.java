package com.hca.vendingapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hca.vendingapi.model.Machine;

public interface MachineRepository extends JpaRepository<Machine, Long> {

	@Query(value = "SELECT o FROM Machine o")
	List<Machine> getAllObjects();

	@Query(value = "SELECT o FROM Machine o WHERE o.id = :id")
	Optional<Machine> getObjectById(@Param("id") Long id);

}