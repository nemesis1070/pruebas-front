create database [PruebaTecnica]
go

USE [PruebaTecnica]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleados](
	[IdEmpleado] [bigint] IDENTITY(1,1) NOT NULL,
	[Nombres] [varchar](200) NULL,
	[Apellidos] [varchar](200) NULL,
	[Edad] [int] NULL,
	[Cargo] [varchar](100) NULL,
	[IdEntidad] [bigint] NULL,
 CONSTRAINT [PK_Empleados] PRIMARY KEY CLUSTERED 
(
	[IdEmpleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Entidades]    Script Date: 11/03/2023 12:17:31 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entidades](
	[IdEntidad] [bigint] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NULL,
	[Direccion] [varchar](200) NULL,
 CONSTRAINT [PK_Entidades] PRIMARY KEY CLUSTERED 
(
	[IdEntidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[IdUsuario] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreUsuario] [varchar](100) NULL,
	[Password] [varchar](100) NULL,
	[Rol] [varchar](100) NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Empleados]  WITH CHECK ADD  CONSTRAINT [FK_Empleados_Entidades] FOREIGN KEY([IdEntidad])
REFERENCES [dbo].[Entidades] ([IdEntidad])
GO
ALTER TABLE [dbo].[Empleados] CHECK CONSTRAINT [FK_Empleados_Entidades]
GO
