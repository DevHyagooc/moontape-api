export class TitleMapper {
  static toResponse(title: any) {
    return {
      id: title.id,
      title: title.title,
      originalTitle: title.originalTitle,
      type: title.type,
      description: title.description,
      releaseDate: title.releaseDate,
      runtime: title.runtime,
      posterUrl: title.posterUrl,
      backdropUrl: title.backdropUrl,
      source: title.source,
      externalId: title.externalId,
      createdAt: title.createdAt,
      updatedAt: title.updatedAt,
      genres: title.titleGenres?.map((item: any) => item.genre) || [],
    };
  }
}