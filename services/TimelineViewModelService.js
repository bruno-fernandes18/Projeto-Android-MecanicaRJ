class TimelineViewModelService {
  processOrder(order) {
    if (
      !order ||
      !order.status_timeline ||
      order.status_timeline.length === 0
    ) {
      return [];
    }
    const sortedTimeline = [...order.status_timeline].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    const isOrderCompleted = order.isCompleted === true;

    return sortedTimeline.map((status, index) => {
      const isLastItem = index === sortedTimeline.length - 1;

      let pointType = 'intermediate';
      if (index === 0) {
        pointType = 'start';
      }
      if (isLastItem && isOrderCompleted) {
        pointType = 'end';
      }

      let lineType = 'complete';
      if (isLastItem) {
        lineType = isOrderCompleted ? 'none' : 'pending';
      } else {
        const isNextItemTheLast = index + 1 === sortedTimeline.length - 1;
        if (isNextItemTheLast && isOrderCompleted) {
          lineType = 'gradient';
        }
      }

      const viewModelItem = {
        id: status.id,
        title: status.title,
        description: status.description,
        timestamp: status.timestamp,
        pointType: pointType,
        lineType: lineType,
      };

      return viewModelItem;
    });
  }

  getConnectionErrorViewModel() {
    const errorItem = {
      id: 'error-1',
      title: 'Falha de Conexão',
      description: 'Não conseguimos conectar-nos aos seu pedido.',
      timestamp: new Date().toISOString(),
      pointType: 'error',
      lineType: 'none',
    };
    return [errorItem];
  }
}

export default TimelineViewModelService;
