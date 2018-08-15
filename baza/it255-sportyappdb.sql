-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2018 at 06:15 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it255-sportyappdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `dogadjaji`
--

CREATE TABLE `dogadjaji` (
  `id_dog` int(11) NOT NULL,
  `tim1` varchar(30) NOT NULL,
  `tim2` varchar(30) NOT NULL,
  `mesec` varchar(30) NOT NULL,
  `dan` int(11) NOT NULL,
  `sat` varchar(10) NOT NULL,
  `status` int(11) NOT NULL,
  `kreator` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dogadjaji`
--

INSERT INTO `dogadjaji` (`id_dog`, `tim1`, `tim2`, `mesec`, `dan`, `sat`, `status`, `kreator`) VALUES
(3, 'Zvezda', 'Partizan', 'Mart', 6, '14:00', 0, 'daki123'),
(4, 'FK nebitni', 'Partizan', 'April', 15, '17:00', 0, 'daki123'),
(5, 'Partizan', '', 'Oktobar', 15, '19:00', 0, 'saki123'),
(6, 'FK Jabuka', '', 'Avgust', 16, '21:00', 0, 'saki123'),
(7, 'FK Jabuka', '', 'Jul', 15, '19:00', 0, 'saki123');

-- --------------------------------------------------------

--
-- Table structure for table `igraci`
--

CREATE TABLE `igraci` (
  `igrac` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `nazivtima` varchar(50) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `igraci`
--

INSERT INTO `igraci` (`igrac`, `status`, `nazivtima`, `id`) VALUES
('saki123', 1, 'Partizan', 17),
('saki123', 1, 'FK Jabuka', 18),
('daki123', 1, 'Zvezda', 19),
('daki123', 1, 'FK nebitni', 20),
('suki123', 0, 'Partizan', 21),
('siri123', 0, 'Partizan', 22),
('selja123', 0, 'Partizan', 23),
('seki123', 1, 'Partizan', 24),
('sejo123', 0, 'Partizan', 25),
('sara123', 0, 'Partizan', 26),
('caki123', 0, 'FK Jabuka', 27),
('demi123', 0, 'FK Jabuka', 28),
('deki123', 0, 'FK Jabuka', 29),
('dumi123', 0, 'FK Jabuka', 30),
('sejo123', 0, 'FK Jabuka', 31),
('siri123', 0, 'FK Jabuka', 32),
('miki123', 0, 'FK Jabuka', 33),
('deki123', 0, 'Zvezda', 34),
('demi123', 0, 'Zvezda', 35),
('diki123', 0, 'Zvezda', 36),
('dipsi123', 0, 'Zvezda', 37),
('duki123', 0, 'Zvezda', 38),
('dumi123', 0, 'Zvezda', 39),
('deki123', 0, 'FK nebitni', 40),
('dipsi123', 0, 'FK nebitni', 41),
('caki123', 0, 'FK nebitni', 42),
('duki123', 0, 'FK nebitni', 43),
('seki123', 0, 'FK nebitni', 44),
('sejo123', 0, 'FK nebitni', 45),
('sara123', 0, 'FK nebitni', 46),
('dumi123', 0, 'FK nebitni', 47),
('caki123', 0, 'Zvezda', 48);

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `k_id` int(11) NOT NULL,
  `ime` varchar(60) NOT NULL,
  `prezime` varchar(60) NOT NULL,
  `korisnickoime` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `privilegije` int(11) NOT NULL,
  `token` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`k_id`, `ime`, `prezime`, `korisnickoime`, `password`, `email`, `privilegije`, `token`) VALUES
(8, 'miljan', 'jambrusic', 'miki123', '5cef8740caa587209787549dfccae9ec', 'miki@gmail.com', 1, '4f60cefd72271c9ec26a359fd89a48ef0889632d'),
(9, 'Sakis', 'Ruvas', 'saki123', '23f9b9ff1456681a557116b0d9fbdea9', 'saki@gmail.com', 0, '6fb011839be8e0f03a88a503fdec7fb3ae7d357d'),
(10, 'daki123', 'daki123', 'daki123', '241bfb7890d04d9c7f36b8186873ad7f', 'daki123@gmail.com', 0, 'b9b1b0ca12e3154d094f24ebc4d5a140e39487e3'),
(11, 'caki123', 'caki123', 'caki123', '607567e772b8ba3fcc6279eeed4d931b', 'caki123@gmail.com', 0, 'cbbeb7f4383c1cb6daff87127492e65e013fa616'),
(12, 'deki123', 'deki123', 'deki123', 'c07050977ff1b135791424e28e5c365d', 'deki123@gmail.com', 0, '70cdf3a4df73b4487d8496f22ec88238f74df0d1'),
(13, 'diki123', 'diki123', 'diki123', 'dffaa4c60a250f19dc4a79b1d05c8d53', 'diki123@gmail.com', 0, 'a5eff8b66e7415cbcc7f9faeca62c69538341c09'),
(14, 'duki123', 'duki123', 'duki123', 'b229e72fef8cba9e8f13ede4644f7909', 'duki123@gmail.com', 0, '816e31b4a870e4155a929b5b4df5051494c4a570'),
(15, 'dumi123', 'dumi123', 'dumi123', '06e6e44651fd8c00c36af6279f27d99d', 'dumi123@gmail.com', 0, '6c7862a3d392cf768ffe1a434cfe9a27ac9469dd'),
(16, 'dipsi123', 'dipsi123', 'dipsi123', '8bc04b952be1e2a19cb3e55032295dcb', 'dipsi123@gmail.com', 0, 'a097f1f758ff698e1f46dd5a2f6ac96497f2cfa8'),
(17, 'demi123', 'demi123', 'demi123', '98db765caf541f6be0ae0cb33f6778bb', 'demi123@gmail.com', 0, '4c0772e4702995226e1d8c9d027521bb01c412fc'),
(18, 'seki123', 'seki123', 'seki123', 'dcd8627bacb4ed8d6cb3610e33c32837', 'seki123@gmail.com', 0, 'a8ddb2b3078198ba8761100e385192bbcc47eddc'),
(19, 'suki123', 'suki123', 'suki123', '95555ba7d2eefaf70654e5c48408faff', 'suki123@gmail.com', 0, 'b4cccf5d0911ef6e70383f167a13d68c6a1b83ab'),
(20, 'sejo123', 'sejo123', 'sejo123', 'd83a3d87eb8478f3477fb8c2bc4bc106', 'sejo123@gmail.com', 0, '50f7148cefdcd6e87f117f5edaad46d5b106e03f'),
(21, 'selja123', 'selja123', 'selja123', 'd8d7c91df16841ab43127013ca53d5fa', 'selja123@gmail.com', 0, '08dc8140cd963b63fd4c95aadd5d1d4cd98c6aa3'),
(22, 'siri123', 'siri123', 'siri123', '281d64c7d1c18b29465391178b08f7d5', 'siri123@gmail.com', 0, '030e64ca389e733dd4d9cd689dd4be1b89d43325'),
(23, 'sara123', 'sara123', 'sara123', '312dc6ec7c900fb9017bf43c6b1f81bb', 'sara123@gmail.com', 0, '9263b09aaf4ab1e64ee9c32f49db5d684f754b83');

-- --------------------------------------------------------

--
-- Table structure for table `timovi`
--

CREATE TABLE `timovi` (
  `nazivtima` varchar(80) NOT NULL,
  `kreator` varchar(50) NOT NULL,
  `id_tima` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `timovi`
--

INSERT INTO `timovi` (`nazivtima`, `kreator`, `id_tima`) VALUES
('Partizan', 'saki123', 13),
('FK Jabuka', 'saki123', 14),
('Zvezda', 'daki123', 15),
('FK nebitni', 'daki123', 16);

-- --------------------------------------------------------

--
-- Table structure for table `zabranjenitermini`
--

CREATE TABLE `zabranjenitermini` (
  `zabr_id` int(11) NOT NULL,
  `sport` varchar(10) NOT NULL,
  `mesec` varchar(12) NOT NULL,
  `dan` int(11) NOT NULL,
  `sat` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `zabranjenitermini`
--

INSERT INTO `zabranjenitermini` (`zabr_id`, `sport`, `mesec`, `dan`, `sat`) VALUES
(8, 'Odbojka', 'Mart', 1, '12:00'),
(10, 'Odbojka', 'Januar', 1, '11:00'),
(11, 'Fudbal', 'Mart', 1, '10:00'),
(12, 'Fudbal', 'Januar', 1, '10:00'),
(13, 'Fudbal', 'Avgust', 11, '16:00'),
(14, 'Tenis', 'Januar', 7, '15:00'),
(16, 'Fudbal', 'Januar', 7, '13:00'),
(17, 'Fudbal', 'Januar', 7, '20:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dogadjaji`
--
ALTER TABLE `dogadjaji`
  ADD PRIMARY KEY (`id_dog`);

--
-- Indexes for table `igraci`
--
ALTER TABLE `igraci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`k_id`),
  ADD UNIQUE KEY `korisnickoime` (`korisnickoime`),
  ADD UNIQUE KEY `korisnickoime_2` (`korisnickoime`);

--
-- Indexes for table `timovi`
--
ALTER TABLE `timovi`
  ADD PRIMARY KEY (`id_tima`),
  ADD UNIQUE KEY `nazivtima` (`nazivtima`);

--
-- Indexes for table `zabranjenitermini`
--
ALTER TABLE `zabranjenitermini`
  ADD PRIMARY KEY (`zabr_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dogadjaji`
--
ALTER TABLE `dogadjaji`
  MODIFY `id_dog` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `igraci`
--
ALTER TABLE `igraci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `k_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `timovi`
--
ALTER TABLE `timovi`
  MODIFY `id_tima` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `zabranjenitermini`
--
ALTER TABLE `zabranjenitermini`
  MODIFY `zabr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
