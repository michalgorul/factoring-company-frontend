<div id="top"></div>

# Application for managing a factoring company

The main part of the work will be designing and developing a web application. The system will cover part of the factoring company's business processes. Among others, it will include generating contracts and accounting documents or automation of settlements of payments, remunerations, interest and sending money to the clients. The aim of the project is to reduce manual work, which will result in a much faster execution of orders and lower costs for a potential factoring company. As a security layer i use Spring Security with JWT.

#### Availability
Project is available as [Heroku app](https://factoring-company.herokuapp.com)

## Database diagram

![Database diagram](https://user-images.githubusercontent.com/43811151/147573672-678c26bb-3b25-4974-8c84-0833cae13e7a.png)

<p align="right">(<a href="#top">back to top</a>)</p>

## Use case diagram

![Use case diagram](https://user-images.githubusercontent.com/43811151/147573633-09e21e7c-e94a-4ada-b5e1-787f7db731e2.png)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Michał Góral - michgor088@student.polsl.pl

<p align="right">(<a href="#top">back to top</a>)</p>

## Sample code snippents

### Entity
```java
@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "bank_account", schema = "public", catalog = "factoring_company")
public class BankAccountEntity {
    @Id
    @SequenceGenerator(
            name = "bank_account_sequence",
            sequenceName = "bank_account_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bank_account_sequence"
    )
    private Long id;

    @Column(name = "bank_swift", nullable = false, length = 8)
    private String bankSwift;

    @Column(name = "bank_account_number", nullable = false, length = 28, unique = true)
    private String bankAccountNumber;

    @Column(name = "bank_name", nullable = false, length = 50)
    private String bankName;

    @Column(name = "seller_id", nullable = true)
    private Integer sellerId;

    @Column(name = "company_id", nullable = true)
    private Integer companyId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "seller_id", referencedColumnName = "id", insertable = false, updatable = false)
    private SellerEntity sellerBySellerId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "company_id", referencedColumnName = "id", insertable = false, updatable = false)
    private CompanyEntity companyByCompanyId;
}
```

### Controller
```java 
@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<CustomerEntity> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping(path = "/current")
    public List<CustomerEntity> getCurrentUserCustomers() {
        return customerService.getCurrentUserCustomers();
    }
    
    @GetMapping(path = "/{id}")
    public CustomerEntity getCustomer(@PathVariable Long id) {
        return this.customerService.getCustomer(id);
    }
    
    @PostMapping
    public CustomerEntity addCustomer(@RequestBody CustomerRequestDto customerRequestDto) {
        return this.customerService.addCustomer(customerRequestDto);
    }

    @PutMapping("/{id}")
    public CustomerEntity updateCustomer(@PathVariable Long id, @RequestBody CustomerRequestDto customerRequestDto) {
        return this.customerService.updateCustomer(id, customerRequestDto);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}
```

### Repository

```java
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsername(String username);
}
```

### Sample service method

```java
@Transactional
    public ProductEntity updateProduct(Long id, String name, String pkwiu, String measureUnit) {

        Optional<ProductEntity> productEntity = productRepository.findById(id);

        if (productEntity.isEmpty())
            throw new IdNotFoundInDatabaseException("Product", id);

        validating(name, pkwiu, measureUnit);

        try {
            productEntity.get().setName(StringUtils.capitalize(name));
            productEntity.get().setMeasureUnit(measureUnit);
            productEntity.get().setPkwiu(pkwiu);
            return this.productRepository.save(productEntity.get());
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
```
<p align="right">(<a href="#top">back to top</a>)</p>
