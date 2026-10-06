-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2026 at 11:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `innosoft`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `organizerEmail` varchar(100) NOT NULL,
  `attendees` int(11) NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `roomId`, `title`, `organizerEmail`, `attendees`, `startTime`, `endTime`, `status`, `createdAt`) VALUES
(2, 1, 'test booking routes', 'innosoft@gmail.com', 4, '2026-10-06 07:00:00', '2026-10-06 08:00:00', 'confirmed', '2026-10-06 06:54:13'),
(4, 1, 'test booking routes', 'innosoft@gmail.com', 4, '2026-10-06 09:30:00', '2026-10-06 11:00:00', 'confirmed', '2026-10-06 08:45:25'),
(5, 4, 'Test', 'rawa@gmail.com', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'confirmed', '2026-10-06 08:46:28'),
(6, 4, 'test booking routes', 'innosoft@gmail.com', 4, '2026-10-06 09:30:00', '2026-10-06 11:00:00', 'confirmed', '2026-10-06 09:05:42');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `roomName` varchar(120) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `amenities` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `roomName`, `capacity`, `floor`, `amenities`) VALUES
(1, 'Atlas', 4, 1, 'monitor'),
(2, 'Borealis', 8, 1, 'projector ,whiteboard'),
(3, 'Cascade', 12, 2, 'projector, video-conferencing'),
(4, 'Delta', 20, 3, 'projector, video-conferencing, whiteboard'),
(5, 'Ember', 2, 2, 'none');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomId` (`roomId`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
