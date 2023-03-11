USE [PruebaTecnica]
GO
SET IDENTITY_INSERT [dbo].[Entidades] ON 

INSERT [dbo].[Entidades] ([IdEntidad], [Nombre], [Direccion]) VALUES (1, N'Avianca', N'Calle26')
INSERT [dbo].[Entidades] ([IdEntidad], [Nombre], [Direccion]) VALUES (2, N'Bavaria', N'Avenida Boyaca')
INSERT [dbo].[Entidades] ([IdEntidad], [Nombre], [Direccion]) VALUES (4, N'Coca Cola', N'Av Norte')
SET IDENTITY_INSERT [dbo].[Entidades] OFF
GO
SET IDENTITY_INSERT [dbo].[Empleados] ON 

INSERT [dbo].[Empleados] ([IdEmpleado], [Nombres], [Apellidos], [Edad], [Cargo], [IdEntidad]) VALUES (1, N'Pepe1', N'Perez', 23, N'Cajero', 1)
INSERT [dbo].[Empleados] ([IdEmpleado], [Nombres], [Apellidos], [Edad], [Cargo], [IdEntidad]) VALUES (2, N'Carlos', N'Gomez', 35, N'Asistente', 2)
INSERT [dbo].[Empleados] ([IdEmpleado], [Nombres], [Apellidos], [Edad], [Cargo], [IdEntidad]) VALUES (4, N'prueba', N'prueba', 11, N'Cajero', 4)
SET IDENTITY_INSERT [dbo].[Empleados] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Password], [Rol]) VALUES (2, N'prueba', N'123', N'Administrador')
INSERT [dbo].[Usuarios] ([IdUsuario], [NombreUsuario], [Password], [Rol]) VALUES (3, N'prueba2', N'12', N'Anonimo')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
