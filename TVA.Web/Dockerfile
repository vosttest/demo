FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["TVA.Web/TVA.Web.csproj", "TVA.Web/"]
COPY ["TVA.BLL/TVA.BLL.csproj", "TVA.BLL/"]
COPY ["TVA.DAL/TVA.DAL.csproj", "TVA.DAL/"]
COPY ["TVA/TVA.csproj", "TVA/"]
RUN dotnet restore "TVA.Web/TVA.Web.csproj"
COPY . .
WORKDIR "/src/TVA.Web"
RUN dotnet build "TVA.Web.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "TVA.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TVA.Web.dll"]