-- V7: Demo data for the public portfolio deployment.
--
-- Rows are inserted by natural key (department name, employee email, asset tag)
-- rather than by hard-coded id, so this stays correct regardless of where the
-- sequences happen to start. Every statement is guarded with ON CONFLICT so a
-- re-run against a partially populated database is a no-op.
--
-- Asset statuses are kept consistent with the assignment rows: every asset
-- carrying an open assignment is ASSIGNED, and V6's partial unique index means
-- at most one assignment per asset may have a NULL returned_date.

INSERT INTO departments (name, description, status)
VALUES ('Bilgi Teknolojileri', 'Altyapı, yazılım geliştirme ve teknik destek', 'ACTIVE'),
       ('İnsan Kaynakları', 'İşe alım, özlük işleri ve eğitim', 'ACTIVE'),
       ('Finans', 'Muhasebe, bütçe ve mali raporlama', 'ACTIVE'),
       ('Satış ve Pazarlama', 'Müşteri ilişkileri ve pazarlama faaliyetleri', 'ACTIVE'),
       ('Operasyon', 'Lojistik, tedarik ve süreç yönetimi', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;


INSERT INTO employees (first_name, last_name, email, phone, job_title, status, department_id)
SELECT v.first_name, v.last_name, v.email, v.phone, v.job_title, v.status, d.id
FROM (VALUES ('Ayşe', 'Yıldırım', 'ayse.yildirim@nextalx.com', '+90 532 118 4471', 'Kıdemli Yazılım Mühendisi', 'ACTIVE', 'Bilgi Teknolojileri'),
             ('Mehmet', 'Kaya', 'mehmet.kaya@nextalx.com', '+90 533 226 9013', 'DevOps Mühendisi', 'ACTIVE', 'Bilgi Teknolojileri'),
             ('Zeynep', 'Demir', 'zeynep.demir@nextalx.com', '+90 535 447 2280', 'Sistem Yöneticisi', 'ACTIVE', 'Bilgi Teknolojileri'),
             ('Burak', 'Şahin', 'burak.sahin@nextalx.com', '+90 536 903 5514', 'Yazılım Mühendisi', 'ACTIVE', 'Bilgi Teknolojileri'),
             ('Elif', 'Aydın', 'elif.aydin@nextalx.com', '+90 537 664 1129', 'Test Mühendisi', 'ACTIVE', 'Bilgi Teknolojileri'),
             ('Canan', 'Öztürk', 'canan.ozturk@nextalx.com', '+90 538 271 8806', 'İnsan Kaynakları Müdürü', 'ACTIVE', 'İnsan Kaynakları'),
             ('Serkan', 'Polat', 'serkan.polat@nextalx.com', '+90 539 555 3372', 'İşe Alım Uzmanı', 'ACTIVE', 'İnsan Kaynakları'),
             ('Gizem', 'Arslan', 'gizem.arslan@nextalx.com', '+90 530 812 6045', 'İnsan Kaynakları Uzmanı', 'INACTIVE', 'İnsan Kaynakları'),
             ('Murat', 'Çelik', 'murat.celik@nextalx.com', '+90 531 340 7719', 'Finans Müdürü', 'ACTIVE', 'Finans'),
             ('Deniz', 'Koç', 'deniz.koc@nextalx.com', '+90 532 986 2264', 'Mali Analist', 'ACTIVE', 'Finans'),
             ('Fatma', 'Güneş', 'fatma.gunes@nextalx.com', '+90 533 129 5590', 'Muhasebe Uzmanı', 'ACTIVE', 'Finans'),
             ('Emre', 'Doğan', 'emre.dogan@nextalx.com', '+90 534 703 8836', 'Satış Müdürü', 'ACTIVE', 'Satış ve Pazarlama'),
             ('Selin', 'Yılmaz', 'selin.yilmaz@nextalx.com', '+90 535 418 1157', 'Pazarlama Uzmanı', 'ACTIVE', 'Satış ve Pazarlama'),
             ('Onur', 'Tekin', 'onur.tekin@nextalx.com', '+90 536 592 4403', 'Satış Temsilcisi', 'ACTIVE', 'Satış ve Pazarlama'),
             ('Hakan', 'Erdoğan', 'hakan.erdogan@nextalx.com', '+90 537 260 9978', 'Operasyon Müdürü', 'ACTIVE', 'Operasyon'),
             ('Merve', 'Aksoy', 'merve.aksoy@nextalx.com', '+90 538 837 6621', 'Lojistik Uzmanı', 'ACTIVE', 'Operasyon')
     ) AS v (first_name, last_name, email, phone, job_title, status, department)
         JOIN departments d ON d.name = v.department
ON CONFLICT (email) DO NOTHING;


INSERT INTO categories (name, description, status)
VALUES ('Dizüstü Bilgisayar', 'Taşınabilir iş istasyonları', 'ACTIVE'),
       ('Masaüstü Bilgisayar', 'Sabit iş istasyonları', 'ACTIVE'),
       ('Monitör', 'Harici ekranlar', 'ACTIVE'),
       ('Mobil Cihaz', 'Kurumsal telefon ve tabletler', 'ACTIVE'),
       ('Ağ Ekipmanı', 'Switch, router ve erişim noktaları', 'ACTIVE'),
       ('Yazıcı ve Tarayıcı', 'Ofis baskı cihazları', 'ACTIVE'),
       ('Aksesuar', 'Klavye, mouse, dock ve kulaklık', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;


INSERT INTO assets (asset_tag, name, brand, model, serial_number,
                    purchase_date, warranty_end_date, purchase_price, supplier,
                    status, category_id)
SELECT v.asset_tag, v.name, v.brand, v.model, v.serial_number,
       v.purchase_date, v.warranty_end_date, v.purchase_price, v.supplier,
       v.status, c.id
FROM (VALUES ('NX-LT-0001', 'MacBook Pro 14"', 'Apple', 'M3 Pro', 'C02XK1LT0001', DATE '2024-02-19', DATE '2027-02-19', 78500.00, 'Bilkom Bilişim', 'ASSIGNED', 'Dizüstü Bilgisayar'),
             ('NX-LT-0002', 'MacBook Pro 14"', 'Apple', 'M3 Pro', 'C02XK1LT0002', DATE '2024-02-19', DATE '2027-02-19', 78500.00, 'Bilkom Bilişim', 'ASSIGNED', 'Dizüstü Bilgisayar'),
             ('NX-LT-0003', 'ThinkPad X1 Carbon', 'Lenovo', 'Gen 11', 'PF3LT00003', DATE '2024-06-11', DATE '2027-06-11', 62400.00, 'Index Grup', 'ASSIGNED', 'Dizüstü Bilgisayar'),
             ('NX-LT-0004', 'ThinkPad X1 Carbon', 'Lenovo', 'Gen 11', 'PF3LT00004', DATE '2024-06-11', DATE '2027-06-11', 62400.00, 'Index Grup', 'ASSIGNED', 'Dizüstü Bilgisayar'),
             ('NX-LT-0005', 'XPS 15', 'Dell', '9530', 'DLXPS00005', DATE '2025-01-23', DATE '2028-01-23', 71900.00, 'Despec Bilgisayar', 'ASSIGNED', 'Dizüstü Bilgisayar'),
             ('NX-LT-0006', 'Latitude 5540', 'Dell', '5540', 'DLLAT00006', DATE '2025-04-08', DATE '2028-04-08', 44300.00, 'Despec Bilgisayar', 'ASSIGNED', 'Dizüstü Bilgisayar'),
             ('NX-LT-0007', 'EliteBook 840 G10', 'HP', '840 G10', 'HPEB000007', DATE '2025-04-08', DATE '2028-04-08', 47800.00, 'Penta Teknoloji', 'ASSIGNED', 'Dizüstü Bilgisayar'),
             ('NX-LT-0008', 'MacBook Air 13"', 'Apple', 'M2', 'C02XK1LT0008', DATE '2023-09-14', DATE '2026-09-14', 41200.00, 'Bilkom Bilişim', 'AVAILABLE', 'Dizüstü Bilgisayar'),
             ('NX-LT-0009', 'ThinkPad T14', 'Lenovo', 'Gen 4', 'PF3LT00009', DATE '2023-11-27', DATE '2026-11-27', 38600.00, 'Index Grup', 'AVAILABLE', 'Dizüstü Bilgisayar'),
             ('NX-LT-0010', 'Latitude 5540', 'Dell', '5540', 'DLLAT00010', DATE '2025-04-08', DATE '2028-04-08', 44300.00, 'Despec Bilgisayar', 'IN_REPAIR', 'Dizüstü Bilgisayar'),
             ('NX-DT-0001', 'iMac 24"', 'Apple', 'M3', 'C02XK1DT0001', DATE '2024-10-02', DATE '2027-10-02', 59900.00, 'Bilkom Bilişim', 'ASSIGNED', 'Masaüstü Bilgisayar'),
             ('NX-DT-0002', 'OptiPlex 7010', 'Dell', '7010 SFF', 'DLOPT00002', DATE '2024-10-02', DATE '2027-10-02', 32700.00, 'Despec Bilgisayar', 'ASSIGNED', 'Masaüstü Bilgisayar'),
             ('NX-DT-0003', 'ProDesk 400 G9', 'HP', '400 G9', 'HPPD000003', DATE '2023-07-19', DATE '2026-07-19', 29800.00, 'Penta Teknoloji', 'AVAILABLE', 'Masaüstü Bilgisayar'),
             ('NX-MN-0001', 'UltraSharp U2723QE', 'Dell', 'U2723QE', 'DLMON00001', DATE '2024-03-05', DATE '2027-03-05', 21400.00, 'Despec Bilgisayar', 'ASSIGNED', 'Monitör'),
             ('NX-MN-0002', 'UltraSharp U2723QE', 'Dell', 'U2723QE', 'DLMON00002', DATE '2024-03-05', DATE '2027-03-05', 21400.00, 'Despec Bilgisayar', 'ASSIGNED', 'Monitör'),
             ('NX-MN-0003', 'UltraFine 27"', 'LG', '27UN880', 'LGMON00003', DATE '2024-08-21', DATE '2026-08-21', 18900.00, 'Arena Bilgisayar', 'ASSIGNED', 'Monitör'),
             ('NX-MN-0004', 'ViewFinity S8', 'Samsung', 'S80UA', 'SMMON00004', DATE '2025-02-13', DATE '2028-02-13', 16700.00, 'Arena Bilgisayar', 'AVAILABLE', 'Monitör'),
             ('NX-MN-0005', 'ViewFinity S8', 'Samsung', 'S80UA', 'SMMON00005', DATE '2025-02-13', DATE '2028-02-13', 16700.00, 'Arena Bilgisayar', 'AVAILABLE', 'Monitör'),
             ('NX-MN-0006', 'UltraFine 27"', 'LG', '27UN880', 'LGMON00006', DATE '2023-05-30', DATE '2025-05-30', 18900.00, 'Arena Bilgisayar', 'BROKEN', 'Monitör'),
             ('NX-MB-0001', 'iPhone 15', 'Apple', 'A3090', 'C02XK1MB0001', DATE '2024-11-18', DATE '2026-11-18', 54300.00, 'Bilkom Bilişim', 'ASSIGNED', 'Mobil Cihaz'),
             ('NX-MB-0002', 'iPhone 15', 'Apple', 'A3090', 'C02XK1MB0002', DATE '2024-11-18', DATE '2026-11-18', 54300.00, 'Bilkom Bilişim', 'ASSIGNED', 'Mobil Cihaz'),
             ('NX-MB-0003', 'Galaxy S24', 'Samsung', 'SM-S921B', 'SMMOB00003', DATE '2025-03-27', DATE '2027-03-27', 46800.00, 'Arena Bilgisayar', 'ASSIGNED', 'Mobil Cihaz'),
             ('NX-MB-0004', 'iPhone 13', 'Apple', 'A2633', 'C02XK1MB0004', DATE '2023-04-12', DATE '2025-04-12', 33500.00, 'Bilkom Bilişim', 'AVAILABLE', 'Mobil Cihaz'),
             ('NX-NW-0001', 'UniFi Switch 24 PoE', 'Ubiquiti', 'USW-24-PoE', 'UBNW000001', DATE '2024-01-16', DATE '2027-01-16', 27600.00, 'Nettek Sistem', 'AVAILABLE', 'Ağ Ekipmanı'),
             ('NX-NW-0002', 'Catalyst 1000', 'Cisco', 'C1000-24T', 'CSNW000002', DATE '2023-08-09', DATE '2026-08-09', 41900.00, 'Nettek Sistem', 'IN_REPAIR', 'Ağ Ekipmanı'),
             ('NX-PR-0001', 'LaserJet Pro M404dn', 'HP', 'M404dn', 'HPPR000001', DATE '2024-05-21', DATE '2027-05-21', 12300.00, 'Penta Teknoloji', 'AVAILABLE', 'Yazıcı ve Tarayıcı'),
             ('NX-PR-0002', 'imageRUNNER 2425', 'Canon', '2425i', 'CNPR000002', DATE '2020-10-13', DATE '2023-10-13', 38400.00, 'Ofis Çözümleri', 'RETIRED', 'Yazıcı ve Tarayıcı'),
             ('NX-AC-0001', 'MX Master 3S', 'Logitech', '910-006559', 'LGAC000001', DATE '2025-06-04', DATE '2027-06-04', 3900.00, 'Arena Bilgisayar', 'IN_REPAIR', 'Aksesuar')
     ) AS v (asset_tag, name, brand, model, serial_number,
             purchase_date, warranty_end_date, purchase_price, supplier,
             status, category)
         JOIN categories c ON c.name = v.category
ON CONFLICT (asset_tag) DO NOTHING;


-- Open assignments first, then the closed history. NX-LT-0001 deliberately
-- appears in both: returned by one employee, since reissued to another.
INSERT INTO assignments (employee_id, asset_id, assigned_date,
                         expected_return_date, returned_date, notes, status)
SELECT e.id, a.id, v.assigned_date, v.expected_return_date, v.returned_date, v.notes, v.status
FROM (VALUES ('NX-LT-0001', 'ayse.yildirim@nextalx.com', DATE '2025-03-10', NULL::date, NULL::date, 'Geliştirme ekibi standart donanımı', 'ACTIVE'),
             ('NX-LT-0002', 'mehmet.kaya@nextalx.com', DATE '2025-03-10', NULL, NULL, 'CI/CD ve altyapı çalışmaları', 'ACTIVE'),
             ('NX-LT-0003', 'zeynep.demir@nextalx.com', DATE '2024-07-01', NULL, NULL, NULL, 'ACTIVE'),
             ('NX-LT-0004', 'burak.sahin@nextalx.com', DATE '2024-09-16', NULL, NULL, NULL, 'ACTIVE'),
             ('NX-LT-0005', 'elif.aydin@nextalx.com', DATE '2025-02-03', NULL, NULL, 'Test otomasyonu için yüksek RAM talebi', 'ACTIVE'),
             ('NX-LT-0006', 'canan.ozturk@nextalx.com', DATE '2025-05-19', NULL, NULL, NULL, 'ACTIVE'),
             ('NX-LT-0007', 'murat.celik@nextalx.com', DATE '2025-05-19', NULL, NULL, NULL, 'ACTIVE'),
             ('NX-DT-0001', 'selin.yilmaz@nextalx.com', DATE '2024-11-04', NULL, NULL, 'Görsel tasarım çalışmaları', 'ACTIVE'),
             ('NX-DT-0002', 'fatma.gunes@nextalx.com', DATE '2024-11-04', NULL, NULL, NULL, 'ACTIVE'),
             ('NX-MN-0001', 'ayse.yildirim@nextalx.com', DATE '2025-03-10', NULL, NULL, 'İkinci ekran', 'ACTIVE'),
             ('NX-MN-0002', 'mehmet.kaya@nextalx.com', DATE '2025-03-10', NULL, NULL, 'İkinci ekran', 'ACTIVE'),
             ('NX-MN-0003', 'zeynep.demir@nextalx.com', DATE '2024-09-02', NULL, NULL, NULL, 'ACTIVE'),
             ('NX-MB-0001', 'emre.dogan@nextalx.com', DATE '2024-12-09', NULL, NULL, 'Saha ziyaretleri için kurumsal hat', 'ACTIVE'),
             ('NX-MB-0002', 'onur.tekin@nextalx.com', DATE '2024-12-09', NULL, NULL, 'Saha ziyaretleri için kurumsal hat', 'ACTIVE'),
             ('NX-MB-0003', 'hakan.erdogan@nextalx.com', DATE '2025-04-14', NULL, NULL, NULL, 'ACTIVE'),
             ('NX-LT-0001', 'merve.aksoy@nextalx.com', DATE '2023-11-06', DATE '2025-03-01', DATE '2025-02-28', 'Rol değişikliği sonrası iade edildi', 'RETURNED'),
             ('NX-LT-0008', 'serkan.polat@nextalx.com', DATE '2024-05-06', DATE '2025-07-01', DATE '2025-06-30', 'Yenileme kapsamında iade', 'RETURNED'),
             ('NX-LT-0009', 'gizem.arslan@nextalx.com', DATE '2024-02-12', DATE '2026-01-31', DATE '2026-01-15', 'İşten ayrılış teslimi', 'RETURNED'),
             ('NX-MB-0004', 'deniz.koc@nextalx.com', DATE '2024-09-02', DATE '2026-03-31', DATE '2026-03-20', 'Cihaz yenilendi', 'RETURNED')
     ) AS v (asset_tag, email, assigned_date, expected_return_date, returned_date, notes, status)
         JOIN assets a ON a.asset_tag = v.asset_tag
         JOIN employees e ON e.email = v.email
WHERE NOT EXISTS (SELECT 1 FROM assignments x WHERE x.asset_id = a.id AND x.employee_id = e.id);
